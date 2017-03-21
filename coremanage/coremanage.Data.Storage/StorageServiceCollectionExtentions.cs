using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Core.Contracts.Repositories;
using coremanage.Data.Storage.Context;
using storagecore.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using coremanage.Data.Storage.Repositories;

namespace coremanage.Data.Storage
{
    public static class StorageServiceCollectionExtentions
    {
        public static IServiceCollection AddStorageDataAccess(this IServiceCollection services)
        {
            services.AddStorageCoreDataAccess<CoreManageDbContext>();
            RegisterStorageDataAccess(services);
            return services;
        }

        private static void RegisterStorageDataAccess(IServiceCollection services)
        {
            services.AddScoped<ICompanyRepository, CompanyRepository>();
        }
    }
}
