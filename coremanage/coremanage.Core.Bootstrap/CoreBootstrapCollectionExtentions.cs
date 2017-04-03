using System.Reflection;
using AutoMapper;
using coremanage.Core.Services.Interfaces.Entities;
using Microsoft.Extensions.DependencyInjection;
using coremanage.Core.Services.Services.Entities;

namespace coremanage.Core.Bootstrap
{
    public static class CoreBootstrapCollectionExtentions
    {



        public static IServiceCollection AddCoreManagerBootstrap(
            this IServiceCollection services
        )
        {
            services.AddAutoMapper();


            services.AddScoped<ITenantService, TenantService>();



            //services.AddScoped<IUserProfileService, UserProfileService>();
            return services;
        }
    }
}
