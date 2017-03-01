using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using IdentityServer4.Services;
using coremanage.IdentityServer.WebApi.Services;
using coremanage.IdentityServer.Storage.EFCore.Common.Entities;
using coremanage.IdentityServer.Storage.EFCore.MSSQL;
using Microsoft.EntityFrameworkCore;

namespace coremanage.IdentityServer.WebApi
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            var connectionString = Configuration.GetConnectionString("DefaultConnection");

            services.AddApplicationInsightsTelemetry(Configuration);
            services.AddTransient<IProfileService, IdentityWithAdditionalClaimsProfileService>();
            services.AddMvc();

            services.AddIdentityServerStorageEFCoreMSSQL(connectionString);
            services.AddIdentityServer()
               .AddTemporarySigningCredential()
               .AddAspNetIdentity<AppUser>()
               .AddProfileService<IdentityWithAdditionalClaimsProfileService>()
               .AddConfigurationStore(builder => builder.UseSqlServer(connectionString))
               .AddOperationalStore(builder => builder.UseSqlServer(connectionString));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseMvc();
        }
    }
}
