using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Bootstrap
{
    public static class CoreBuilderExtensions
    {
        public static IServiceCollection AddIdentityServerStorageEFCoreMSSQL(
            this IServiceCollection services,
            string connectionString
        )
        {
            // Add framework services.
            
            return services;
        }
    }
}
