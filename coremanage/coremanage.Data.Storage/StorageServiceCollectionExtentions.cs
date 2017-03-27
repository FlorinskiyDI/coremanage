using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Data.Storage.Context;
using storagecore.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;

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
            //services.AddScoped<ICompanyRepository, CompanyRepository>();
        }
    }
}
