using coremanage.Data.Storage.Context;
using IdentityServer4.Models;
using IdentityServer4.Test;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;

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
                serviceScope.ServiceProvider.GetRequiredService<CoreManageDbContext>().Database.Migrate();
                var grantContext = serviceScope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>();
                try { await grantContext.Database.MigrateAsync(); }
                catch (System.NotImplementedException) { grantContext.Database.Migrate(); }

                var configContext = serviceScope.ServiceProvider.GetRequiredService<ConfigurationDbContext>();
                try { await configContext.Database.MigrateAsync(); }
                catch (System.NotImplementedException) { configContext.Database.Migrate(); }

                // intitial clients 
                if ((initialClients != null) && (!configContext.Clients.Any()))
                {
                    foreach (var client in initialClients)
                    {
                        var c = client.ToEntity();
                        configContext.Clients.Add(c);
                    }
                    await configContext.SaveChangesAsync();
                }
                // intitial apiResources
                if ((initialApiResources != null) && (!configContext.ApiResources.Any()))
                {
                    foreach (var scope in initialApiResources)
                    {
                        var s = scope.ToEntity();
                        configContext.ApiResources.Add(s);
                    }
                    await configContext.SaveChangesAsync();
                }
                // intitial identityResources
                if ((initialIdentityResources != null) && (!configContext.IdentityResources.Any()))
                {
                    foreach (var scope in initialIdentityResources)
                    {
                        var s = scope.ToEntity();
                        configContext.IdentityResources.Add(s);
                    }
                    await configContext.SaveChangesAsync();
                }

                //// intitial roles       
                //var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                //if (!roleManager.Roles.Any())
                //{
                //    roleManager.CreateAsync(new IdentityRole(EnumRoles.SuperAdmin.ToString()));
                //}

                //// intitial testUsers 
                //var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
                //if ((testUsers != null) && (!userManager.Users.Any()))
                //{
                //    foreach (var inMemoryUser in testUsers)
                //    {
                //        var identityUser = new AppUser(inMemoryUser.Username);
                //        userManager.CreateAsync(identityUser, inMemoryUser.Password).Wait();
                //        userManager.AddToRoleAsync(identityUser, EnumRoles.SuperAdmin.ToString()).Wait(); // Set user role "Superadmin"
                //    }
                //}

            }

        }
    }
}
