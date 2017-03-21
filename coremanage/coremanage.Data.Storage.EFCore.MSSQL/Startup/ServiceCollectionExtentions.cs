using coremanage.Core.Abstraction.Uow;
using coremanage.Data.Storage.EFCore.Common.Context;
using coremanage.Data.Storage.EFCore.Common.Uow;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Data.Storage.EFCore.Common;
using coremanage.Core.Abstraction.Repositories;
using coremanage.Core.Abstraction.Repositories.Entities;
using coremanage.Data.Storage.EFCore.Common.Repositories;
using coremanage.Data.Storage.EFCore.Common.Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using coremanage.Data.DomainModel.Identity;

namespace coremanage.Data.Storage.EFCore.MSSQL.Startup
{
    public static class ServiceCollectionExtentions
    {
        public static IServiceCollection AddDataAccess(
            this IServiceCollection services,
            string connectionString
        )
        {
            AddStorageEFCoreMSSQL(services, connectionString);
            RegisterDataAccess(services);
            return services;
        }

        private static void RegisterDataAccess(IServiceCollection services)
        {
            services.TryAddSingleton<IUowProvider, UowProvider>();
            services.TryAddTransient<IEntityContext, CoreManageDbContext>();
            services.TryAddTransient(typeof(IBaseRepository<,>), typeof(GenericRepository<,>));

            services.TryAddTransient(typeof(ICompanyRepository<Company,int>), typeof(CompanyRepository));
            //services.TryAddTransient(typeof(IDataPager<>), typeof(DataPager<>));
        }

        private static void RegisterDataAccess2(IServiceCollection services)
        {
            services.TryAddSingleton<IUowProvider, UowProvider>();
            services.TryAddTransient<IEntityContext, BaseDbContext<CoreManageDbContext>>();
            services.TryAddTransient(typeof(IBaseRepository<,>), typeof(GenericRepository<,>));
            //services.TryAddTransient(typeof(IDataPager<>), typeof(DataPager<>));
        }


        private static void AddStorageEFCoreMSSQL(IServiceCollection services, string connectionString)
        {
            services.AddDbContext<CoreManageDbContext>(options => 
                options.UseSqlServer(connectionString, b => b.MigrationsAssembly("coremanage.Data.Storage.EFCore.MSSQL")));
        }
    }
}
