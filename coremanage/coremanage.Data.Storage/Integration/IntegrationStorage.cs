using coremanage.Core.Common.Constants;
using coremanage.Data.Models.Entities;
using coremanage.Data.Models.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using storagecore.Abstractions.Uow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace coremanage.Data.Storage
{

    public static class IntegrationStorage
    {
        public static async Task InitializeDatabaseAsync(
            IServiceProvider serviceProvider
        )
        {
            using (var serviceScope = serviceProvider.GetService<IServiceScopeFactory>().CreateScope())
            {
                // initialize IdentityServer
                //await InitIdentityServerAsync(
                //    serviceScope,
                //    initialClients,
                //    initialApiResources,
                //    initialIdentityResources);

                // initialize Identity
                await InitRolesAsync(serviceScope);
                await InitRoleHierarchyAsync(serviceScope);
                await InitUsersAsync(serviceScope);
            }
        }

        private static async Task InitRolesAsync(IServiceScope serviceScope)
        {
            var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            if (!DynamicQueryableExtensions.Any(roleManager.Roles))
            {
                await roleManager.CreateAsync(new ApplicationRole(SystemRoles.SuperAdmin, (int)SystemRoleTypes.SuperAdmin));
                await roleManager.CreateAsync(new ApplicationRole(SystemRoles.GroupAdmin, (int)SystemRoleTypes.SuperAdmin));
                await roleManager.CreateAsync(new ApplicationRole(SystemRoles.TenantAdmin, (int)SystemRoleTypes.GroupAdmin));
                await roleManager.CreateAsync(new ApplicationRole(SystemRoles.DashboardAdmin, (int)SystemRoleTypes.TenantAdmin)); // (Module/ApiClient)
            }
        }

        private static async Task InitRoleHierarchyAsync(IServiceScope serviceScope)
        {
            var dictionary = new Dictionary<string, string>
            {
                { SystemRoles.SuperAdmin, SystemRoles.GroupAdmin },
                { SystemRoles.GroupAdmin, SystemRoles.TenantAdmin },
                { SystemRoles.TenantAdmin, SystemRoles.DashboardAdmin }
            };

            var uowProvider = serviceScope.ServiceProvider.GetRequiredService<IUowProvider>();
            using (var uow = uowProvider.CreateUnitOfWork())
            {
                var hierarchyRepository = uow.GetRepository<IdentityRoleHierarchy, int>();
                var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

                foreach (var hierarchy in dictionary)
                {
                    var roleId = roleManager.FindByNameAsync(hierarchy.Key).Result.Id;
                    var childRoleId = roleManager.FindByNameAsync(hierarchy.Value).Result.Id;
                    await hierarchyRepository.AddAsync(new IdentityRoleHierarchy
                    {
                        RoleId = roleId,
                        ChildRoleId = childRoleId
                    });
                }
                uow.SaveChanges();
            }
        }

        private static async Task InitUsersAsync(
            IServiceScope serviceScope
        )
        {
            var uowProvider = serviceScope.ServiceProvider.GetRequiredService<IUowProvider>();
            var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            var identityUser = new ApplicationUser("SuperAdmin");
            userManager.CreateAsync(identityUser, "SuperAdmin").Wait();
            userManager.AddToRoleAsync(identityUser, SystemRoleTypes.SuperAdmin.ToString()).Wait();
            using (var uow = uowProvider.CreateUnitOfWork())
            {
                var userRepository = uow.GetRepository<UserProfile, string>();
                await userRepository.AddAsync(new UserProfile
                {
                    Id = identityUser.Id,
                    FirstName = "SuperAdmin",
                    MiddleName = "SuperAdmin",
                    LastName = "SuperAdmin",
                    Email = "admin@gmail.com"
                }
                );

                await uow.SaveChangesAsync();
            }
        }        
    }
}
