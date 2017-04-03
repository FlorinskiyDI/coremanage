﻿using Microsoft.Extensions.DependencyInjection;
using coremanage.Core.Contracts.Repositories;
using coremanage.Data.Storage.Context;
using storagecore.EntityFrameworkCore;
using coremanage.Data.Storage.Repositories;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace coremanage.Data.Storage
{
    public static class StorageServiceCollectionExtentions
    {
        public static IServiceCollection AddCoreManagerData(this IServiceCollection services)
        {
            services.AddStorageCoreDataAccess<CoreManageDbContext>();
            RegisterStorageDataAccess(services);
            return services;
        }

        private static void RegisterStorageDataAccess(IServiceCollection services)
        {
            services.AddTransient<IAuthRepository, AuthRepository>();
            services.AddTransient<ITenantRepository, TenantRepository>();
            services.AddScoped<ISecurityRepository, SecurityRepository>();
        }
    }
}
