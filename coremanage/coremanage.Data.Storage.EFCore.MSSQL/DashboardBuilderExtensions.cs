using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Storage.EFCore.MSSQL
{
    class DashboardBuilderExtensions
    {
    }
    public static IServiceCollection AddCoreStorageEFCoreMSSQL(
            this IServiceCollection services,
            string connectionString
        )
    {
        // Add framework services.
        services.AddDbContext<IdentityServerDbContext>(options => options.UseSqlServer(connectionString, b => b.MigrationsAssembly("coremanage.IdentityServer.Storage.EFCore.MSSQL")));
        services.AddIdentity<AppUser, IdentityRole>(options =>
        {
            options.Password.RequireDigit = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequiredLength = 6;
        })
            .AddEntityFrameworkStores<IdentityServerDbContext>()
            .AddDefaultTokenProviders();

        return services;
    }
}
