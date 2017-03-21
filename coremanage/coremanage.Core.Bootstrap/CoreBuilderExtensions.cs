using AutoMapper;
using coremanage.Core.Abstraction.Repositories;
using coremanage.Core.Services.Shared.API.Security;
using coremanage.Core.Services.Shared.Services.Security;
using coremanage.Data.Storage.EFCore.Common.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace coremanage.Core.Bootstrap
{
    public static class CoreBuilderExtensions
    {
        public static IServiceCollection AddCoreServices(
            this IServiceCollection services
        )
        {
            services.AddAutoMapper();
            // Add framework services.
            //services.AddScoped<IBaseRepository<Company>, BaseRepository<Company>>();
            services.AddScoped<ICompanyService, CompanyService>();
            return services;
        }
    }
}
