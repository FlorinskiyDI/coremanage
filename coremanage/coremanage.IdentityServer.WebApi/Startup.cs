using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using coremanage.IdentityServer.WebApi.Services;
using coremanage.IdentityServer.WebApi.Configurations;
using coremanage.Data.Models.Entities;
using coremanage.Data.Storage.Context;
using coremanage.Data.Storage.MSSQL;
using coremanage.Data.Storage.Integration;
using coremanage.Data.Storage;
using coremanage.Core.Bootstrap;
using AutoMapper;
using coremanage.Data.Models.Entities.Identity;
using IdentityServer4.Validation;

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

        // This method gets called by the runtime.Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddApplicationInsightsTelemetry(Configuration);

            // Configurations for ... .
            services.AddStorageMSSQL(connectionString); // dbContext
            services.AddCoreManagerData(); // data access and repositories
            services.AddCoreManagerBootstrap(); // automapper and services

            //services.AddTransient<IResourceOwnerPasswordValidator, ResourceOwnerPasswordValidator>();
            // Configurations for AddIdentityServer 
            services.AddIdentityServer(options =>{ })
                .AddTemporarySigningCredential()

                //.AddConfigurationStoreMSSQL(connectionString) // InDatabase
                //.AddOperationalStoreMSSQL(connectionString) // InDatabase

                //.AddInMemoryIdentityResources(Resources.GetIdentityResources()) // InMemory
                .AddInMemoryApiResources(Resources.GetApiResources()) // InMemory
                .AddInMemoryClients(Clients.Get()) // InMemory

                .AddAspNetIdentity<ApplicationUser>()
                //.AddResourceOwnerValidator<ResourceOwnerPasswordValidator>()
                .AddProfileService<ProfileService>();

            // Configurations for Identity
            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
            })
            .AddEntityFrameworkStores<CoreManageDbContext>()
            .AddDefaultTokenProviders();

            
            services.AddAutoMapper();
            services.AddMvc();
        }

        // This method gets called by the runtime.Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseApplicationInsightsRequestTelemetry();
            app.UseApplicationInsightsExceptionTelemetry();

            //this will do the initial DB population
            //IntegrationStorage.InitializeDatabaseAsync(
            //    app.ApplicationServices,
            //    Clients.Get(),
            //    Resources.GetApiResources(),
            //    null,
            //    TestUsers.Get()
            //).Wait();

            app.UseIdentity();
            app.UseIdentityServer();
            app.UseMvc();
        }
    }
}
