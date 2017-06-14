using System.Reflection;
using AutoMapper;
using coremanage.Core.Services.Interfaces;
using coremanage.Core.Services.Interfaces.Entities;
using Microsoft.Extensions.DependencyInjection;
using coremanage.Core.Services.Services.Entities;
using coremanage.Core.Services.Services;

namespace coremanage.Core.Bootstrap
{
    public static class CoreBootstrapCollectionExtentions
    {
        public static IServiceCollection AddCoreManagerBootstrap(
            this IServiceCollection services
        )
        {
            services.AddScoped<ITenantService, TenantService>();
            services.AddScoped<IUserProfileService, UserProfileService>();
            services.AddScoped<IInvitationService, InvitationService>();

            return services;
        }
    }
}
