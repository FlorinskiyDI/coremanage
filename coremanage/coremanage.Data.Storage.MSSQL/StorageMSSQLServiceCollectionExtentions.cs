using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using coremanage.Data.Storage.Context;

namespace coremanage.Data.Storage.MSSQL
{
    public static class StorageMSSQLServiceCollectionExtentions
    {
        //public static IServiceCollection AddStorageMSSQL(
        //    this IServiceCollection services,
        //    string connectionString
        //)
        //{
        //    services.AddDbContext<CoreManageDbContext>(options =>
        //        options.UseSqlServer(connectionString, b => b.MigrationsAssembly("coremanage.Data.Storage.MSSQL")));

        //    // init storage core data access
        //    //services.AddCoreManagerData();
               
        //    return services;
        //}
    }
}
