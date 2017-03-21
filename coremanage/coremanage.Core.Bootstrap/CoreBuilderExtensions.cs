using AutoMapper;
using coremanage.Core.Services.Shared.API.Security;
using coremanage.Core.Services.Shared.Services.Security;
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
            services.AddScoped<ICompanyService, CompanyService>();
            return services;
        }
    }
}
