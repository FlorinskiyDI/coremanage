using coremanage.Data.Storage.Context;
using IdentityServer4.Models;
using IdentityServer4.Test;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;
using coremanage.Core.Common.Constants;
using Microsoft.EntityFrameworkCore;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using coremanage.Data.Models.Entities;
using coremanage.Data.Models.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using coremanage.Data.Models.Models;
using storagecore.Abstractions.Uow;

namespace coremanage.Data.Storage.Integration
{
    public static class IntegrationStorage
    {
        public static async Task InitializeDatabaseAsync(
            IServiceProvider serviceProvider,
            IEnumerable<Client> initialClients = null,
            IEnumerable<ApiResource> initialApiResources = null,
            IEnumerable<IdentityResource> initialIdentityResources = null,
            IEnumerable<TestUser> testUsers = null
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
                await InitUsersAsync(serviceScope, testUsers);
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
                {SystemRoles.SuperAdmin, SystemRoles.GroupAdmin},
                {SystemRoles.GroupAdmin, SystemRoles.TenantAdmin},
                {SystemRoles.TenantAdmin, SystemRoles.DashboardAdmin}
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
            IServiceScope serviceScope,
            IEnumerable<TestUser> testUsers = null
        )
        {
            var uowProvider = serviceScope.ServiceProvider.GetRequiredService<IUowProvider>();
            var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            if ((testUsers != null) && (!DynamicQueryableExtensions.Any(userManager.Users)))
            {
                foreach (var inMemoryUser in testUsers)
                {
                    var identityUser = new ApplicationUser(inMemoryUser.Username);
                    userManager.CreateAsync(identityUser, inMemoryUser.Password).Wait();
                    userManager.AddToRoleAsync(identityUser, SystemRoleTypes.SuperAdmin.ToString()).Wait();
                    using (var uow = uowProvider.CreateUnitOfWork())
                    {
                        var userRepository = uow.GetRepository<UserProfile, string>();
                        await userRepository.AddAsync(new UserProfile
                            {
                                Id = identityUser.Id,
                                FirstName = "FirstName",
                                LastName = "LastName",
                                EmailAddress = "user@gmail.com",
                                TenantId = 0
                            }
                        );

                        await uow.SaveChangesAsync();
                    }
                }
            }
            
            
        }

        private static async Task InitIdentityServerAsync(
            IServiceScope serviceScope,
            IEnumerable<Client> initialClients = null,
            IEnumerable<ApiResource> initialApiResources = null,
            IEnumerable<IdentityResource> initialIdentityResources = null
        )
        {
            serviceScope.ServiceProvider.GetRequiredService<CoreManageDbContext>().Database.Migrate();
            var grantContext = serviceScope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>();
            try { await grantContext.Database.MigrateAsync(); }
            catch (System.NotImplementedException) { grantContext.Database.Migrate(); }

            var configContext = serviceScope.ServiceProvider.GetRequiredService<ConfigurationDbContext>();
            try { await configContext.Database.MigrateAsync(); }
            catch (System.NotImplementedException) { configContext.Database.Migrate(); }

            // intitial clients 
            if ((initialClients != null) && (!DynamicQueryableExtensions.Any(configContext.Clients)))
            {
                foreach (var client in initialClients)
                {
                    var c = client.ToEntity();
                    configContext.Clients.Add(c);
                }
                await configContext.SaveChangesAsync();
            }
            // intitial apiResources
            if ((initialApiResources != null) && (!DynamicQueryableExtensions.Any(configContext.ApiResources)))
            {
                foreach (var scope in initialApiResources)
                {
                    var s = scope.ToEntity();
                    configContext.ApiResources.Add(s);
                }
                await configContext.SaveChangesAsync();
            }
            // intitial identityResources
            if ((initialIdentityResources != null) && (!DynamicQueryableExtensions.Any(configContext.IdentityResources)))
            {
                foreach (var scope in initialIdentityResources)
                {
                    var s = scope.ToEntity();
                    configContext.IdentityResources.Add(s);
                }
                await configContext.SaveChangesAsync();
            }
        }
    }
}
