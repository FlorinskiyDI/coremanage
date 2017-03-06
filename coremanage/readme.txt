
/////////////////////////////////////////
// coremanage.IdentityServer
/////////////////////////////////////////

// hosts
localhost:5100 - coremanage.IdentityServer.WebApi

// commands for migration
PM> add-migration -n InitialIdentityServerPersistedGrantDbMigration -c PersistedGrantDbContext -o Migrations/IdentityServer/PersistedGrantDb -StartupProject coremanage.IdentityServer.WebApi
PM> add-migration -n InitialIdentityServerConfigurationDbMigration -c ConfigurationDbContext -o Migrations/IdentityServer/ConfigurationDb -StartupProject coremanage.IdentityServer.WebApi 
PM> add-migration -n InitialAspNetIdentity -c IdentityServerDbContext -o Migrations -StartupProject coremanage.IdentityServer.WebApi
PM> update-database -StartupProject coremanage.IdentityServer.WebApi



/////////////////////////////////////////
// coremanage.Dashboard
/////////////////////////////////////////

// hosts
localhost:5200 - coremanage.Dashboard.WebApi
localhost:5300 - coremanage.Dashboard.Api

// commands for migration
PM> add-migration -n InitialCoreManage -c CoreManageDbContext -o Migrations -StartupProject coremanage.Dashboard.WebApi
PM> update-database -StartupProject coremanage.Dashboard.WebApi



