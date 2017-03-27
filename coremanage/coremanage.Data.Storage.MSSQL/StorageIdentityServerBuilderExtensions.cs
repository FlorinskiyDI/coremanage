using coremanage.Data.Storage.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace coremanage.Data.Storage.MSSQL
{
    public static class StorageIdentityServerBuilderExtensions
    {

        public static IIdentityServerBuilder AddConfigurationStoreMSSQL(
            this IIdentityServerBuilder builderScope,
            string connectionString
        )
        {
            builderScope.AddConfigurationStore(builder => builder.UseSqlServer(connectionString, b => b.MigrationsAssembly("coremanage.Data.Storage.MSSQL")));
            return builderScope;
        }

        public static IIdentityServerBuilder AddOperationalStoreMSSQL(
            this IIdentityServerBuilder builderScope,
            string connectionString
        )
        {
            builderScope.AddOperationalStore(builder => builder.UseSqlServer(connectionString, b => b.MigrationsAssembly("coremanage.Data.Storage.MSSQL")));
            return builderScope;
        }

    }
}
