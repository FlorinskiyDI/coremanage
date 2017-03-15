using AutoMapper;
using coremanage.Core.Abstraction.Repositories;
using coremanage.Data.DomainModel.Identity;
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
            services.AddAutoMapper();
            // Add framework services.
            //services.AddScoped<IBaseRepository<Company>, BaseRepository<Company>>();
            return services;
        }
    }
}
