using Microsoft.Extensions.DependencyInjection;
using coremanage.IdentityServer.Storage.EFCore.Common.DbContexts;
using Microsoft.EntityFrameworkCore;
using coremanage.IdentityServer.Storage.EFCore.Common.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace coremanage.IdentityServer.Storage.EFCore.MSSQL
{
    public static class IdentityServerBuilderExtensions
    {
        public static IServiceCollection AddIdentityServerStorageEFCoreMSSQL(
            this IServiceCollection services,
            string connectionString
        )
        {
            // Add framework services.
            services.AddDbContext<IdentityServerDbContext>(options => options.UseSqlServer(connectionString));
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
}
