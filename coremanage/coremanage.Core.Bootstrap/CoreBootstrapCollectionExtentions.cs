using System.Reflection;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace coremanage.Core.Bootstrap
{
    public static class CoreBootstrapCollectionExtentions
    {



        public static IServiceCollection AddCoreBootstrap(
            this IServiceCollection services
        )
        {


            var config = new AutoMapper.AutoMapperConfig();
            var cc = Assembly.GetEntryAssembly();
            //services.AddAutoMapper();
            services.AddAutoMapper(cc);
            //services.AddScoped<ICompanyService, CompanyService>();
            //services.AddScoped<IUserProfileService, UserProfileService>();
            return services;
        }
    }
}
