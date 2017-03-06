using coremanage.Data.Storage.EFCore.Common.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace coremanage.Data.Storage.EFCore.MSSQL
{


    public static class CoreManageBuilderExtensions
    {
        public static IServiceCollection AddCoreManageStorageEFCoreMSSQL(
            this IServiceCollection services,
            string connectionString
        )
        {
            // Add framework services.
            services.AddDbContext<CoreManageDbContext>(options => options.UseSqlServer(connectionString, b => b.MigrationsAssembly("coremanage.Data.Storage.EFCore.MSSQL")));
            

            return services;
        }
    }
}
