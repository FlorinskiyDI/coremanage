
/////////////////////////////////////////
// coremanage.IdentityServer
/////////////////////////////////////////

// commands for migration
PM> add-migration -n InitialIdentityServerPersistedGrantDbMigration -c PersistedGrantDbContext -o Migrations/IdentityServer/PersistedGrantDb -StartupProject coremanage.IdentityServer.WebApi
PM> add-migration -n InitialIdentityServerConfigurationDbMigration -c ConfigurationDbContext -o Migrations/IdentityServer/ConfigurationDb -StartupProject coremanage.IdentityServer.WebApi 
PM> add-migration -n InitialAspNetIdentity -c IdentityServerDbContext -o Migrations -StartupProject coremanage.IdentityServer.WebApi
PM> update-database -StartupProject coremanage.IdentityServer.WebApi



/////////////////////////////////////////
// coremanage.Dashboard
/////////////////////////////////////////




