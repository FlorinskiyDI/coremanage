﻿using Microsoft.Extensions.DependencyInjection;
using coremanage.Core.Contracts.Repositories;
using coremanage.Data.Storage.Context;
using storagecore.EntityFrameworkCore;
using coremanage.Data.Storage.Repositories;
using coremanage.Data.Storage.Repositories.Entities;
using Microsoft.Extensions.DependencyInjection.Extensions;
using coremanage.Data.Models.Entities.Identity;
using Microsoft.EntityFrameworkCore;

namespace coremanage.Data.Storage
{
    public static class StorageServiceCollectionExtentions
    {

        public static IServiceCollection AddStorageMSSQL(
           this IServiceCollection services,
           string connectionString
       )
        {
            services.AddDbContext<CoreManageDbContext>(options =>
                options.UseSqlServer(connectionString));

            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
            })
            .AddEntityFrameworkStores<CoreManageDbContext>()
            .AddDefaultTokenProviders();
            // init storage core data access
            //services.AddCoreManagerData();

            return services;
        }

        public static IServiceCollection AddCoreManagerData(this IServiceCollection services)
        {
            services.AddStorageCoreDataAccess<CoreManageDbContext>();

            InjectionRepositories(services);
            AddIdentity(services);

            return services;
        }

        private static void InjectionRepositories(IServiceCollection services)
        {
            services.AddTransient<ITenantRepository, TenantRepository>();
            services.AddTransient<ISecurityRepository, SecurityRepository>();
            services.AddTransient<IIdentityRoleHierarchyRepository, IdentityRoleHierarchyRepository>();
        }

        private static void AddIdentity(IServiceCollection services)
        {
            // Configurations for Identity
            
        }
    }
}
