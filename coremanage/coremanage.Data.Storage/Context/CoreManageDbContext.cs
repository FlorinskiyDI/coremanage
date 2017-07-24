using coremanage.Data.Models.Entities;
using Microsoft.EntityFrameworkCore;
using storagecore.EntityFrameworkCore.Context;
using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Data.Models.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using storagecore.Abstractions.Context;
using coremanage.Data.Models.Interfaces;
using System.Reflection;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;

namespace coremanage.Data.Storage.Context
{
    public class CoreManageDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>, IEntityContext
    {
        public CoreManageDbContext(DbContextOptions<CoreManageDbContext> options) : base(options)
        {
        }

        // entities
        public DbSet<PersonalClaim> PersonalClaims { get; set; }
        public DbSet<IdentityRoleHierarchy> IdentityRoleHierarchies { get; set; }
        public DbSet<PersonalTenantClaim> PersonalTenantClaims { get; set; }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<UserProfileTenant> UserProfileTenants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure  relationships between table
            modelBuilder.Entity<UserProfileTenant>(entity => { entity.HasKey(e => new { e.UserProfileId, e.TenantId }); });
            modelBuilder.Entity<PersonalTenantClaim>(entity => { entity.HasKey(e => new { e.PersonalClaimId, e.TenantId }); });
            modelBuilder.Entity<IdentityRoleHierarchy>(entity => { entity.HasKey(e => new { e.RoleId, e.ChildRoleId }); });

            // Configure soft deletes
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                if (typeof(IAuditable).IsAssignableFrom(entity.ClrType))
                {
                    modelBuilder.Entity(entity.ClrType).HasDiscriminator("IsDeleted", typeof(bool?)).HasValue(false);
                    modelBuilder.Entity(entity.ClrType).Property(typeof(bool?), "IsDeleted").IsRequired(true).HasDefaultValue(false);
                    modelBuilder.Entity(entity.ClrType).Property(typeof(bool?), "IsDeleted").Metadata.IsReadOnlyAfterSave = false;
                }
            }

            base.OnModelCreating(modelBuilder);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            this.OnBeforeSaving();
            return base.SaveChangesAsync(cancellationToken);
        }
        public override int SaveChanges()
        {
            this.OnBeforeSaving();
            return base.SaveChanges();
        }

        private void OnBeforeSaving()
        {
            // implementation auditable
            var objectStateEntries = ChangeTracker.Entries()
                .Where(e => e.Entity is IAuditable && e.State != EntityState.Detached && e.State != EntityState.Unchanged)
                .ToList();
            var currentTime = DateTime.UtcNow;

            foreach (var entry in objectStateEntries)
            {

                var entityBase = entry.Entity as IAuditable;
                if (entityBase == null)
                    continue;

                switch (entry.State)
                {
                    case EntityState.Deleted:
                        {
                            entry.State = EntityState.Modified;
                            entityBase.DeletedTime = currentTime;
                            entry.Property("IsDeleted").CurrentValue = true;
                            break;
                        }
                    case EntityState.Modified:
                        entityBase.ModifiedTime = currentTime;
                        break;
                    case EntityState.Added:
                        entityBase.AddedTime = currentTime;
                        break;
                    default:
                        break;
                }

            }
        }
    }
}
