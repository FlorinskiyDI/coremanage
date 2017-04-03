using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using coremanage.Core.Bootstrap;
using coremanage.Data.Storage;
using coremanage.Data.Storage.MSSQL;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace coremanage.Dashboard.WebApi
{
    public class Startup
    {
        public static IConfigurationRoot Configuration;
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            if (env.IsEnvironment("Development"))
            {
                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddMvcCore()
               .AddAuthorization()
               .AddJsonFormatters();
            services.AddCors();

            services.AddStorageMSSQL(connectionString); // registering the context and SqlServer
            services.AddCoreManagerData(); // registering the repository
            services.AddCoreManagerBootstrap(); // registering the services
            

            services.AddAutoMapper();
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseApplicationInsightsRequestTelemetry();
            app.UseApplicationInsightsExceptionTelemetry();

            app.UseIdentityServerAuthentication(new IdentityServerAuthenticationOptions
            {
                Authority = Configuration.GetSection("CustomSettings").GetValue<string>("IdentityHost"),
                ApiName = Configuration.GetSection("CustomSettings").GetValue<string>("ApiName"),
                RequireHttpsMetadata = false
            });

            var webHost = Configuration.GetSection("CustomSettings").GetValue<string>("WebHost");
            app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin()
                .AllowCredentials());

            app.UseMvc();
        }
    }
}
