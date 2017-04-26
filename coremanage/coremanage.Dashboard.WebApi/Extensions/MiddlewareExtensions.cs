using coremanage.Dashboard.WebApi.Middleware;
using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace coremanage.Dashboard.WebApi.Extensions
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseProfileMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ProfileMiddleWare>();
        }
        public static IApplicationBuilder UseContextMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ContextMiddleWare>();
        }
        //public static IServiceCollection CachePageClaimsRoles(this IServiceCollection services)
        //{
        //    SecurityRepository repository = services.BuildServiceProvider().GetRequiredService<SecurityRepository>();
        //    PageService.CachePageClaimsRoles(repository);
        //    return services;
        //}
    }
}
