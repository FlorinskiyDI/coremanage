
/////////////////////////////////////////
// coremanage.IdentityServer
/////////////////////////////////////////

// hosts
localhost:5100 - coremanage.IdentityServer.WebApi (asp.net core web api)

// commands for migration
PM> add-migration -n InitialIdentityServerPersistedGrantDbMigration -c PersistedGrantDbContext -o Migrations/IdentityServer/PersistedGrantDb -StartupProject coremanage.IdentityServer.WebApi
PM> add-migration -n InitialIdentityServerConfigurationDbMigration -c ConfigurationDbContext -o Migrations/IdentityServer/ConfigurationDb -StartupProject coremanage.IdentityServer.WebApi 
PM> add-migration -n InitialAspNetIdentity -c IdentityServerDbContext -o Migrations -StartupProject coremanage.IdentityServer.WebApi
PM> update-database -StartupProject coremanage.IdentityServer.WebApi



/////////////////////////////////////////
// coremanage.Dashboard
/////////////////////////////////////////

// hosts
localhost:5200 - coremanage.Dashboard.WebApi (asp.net core web api)
localhost:5300 - coremanage.Dashboard.Web (Angular2)

// commands for migration
PM> add-migration -n InitialCoreManage -c CoreManageDbContext -o Migrations -StartupProject coremanage.Dashboard.WebApi
PM> update-database -StartupProject coremanage.Dashboard.WebApi



