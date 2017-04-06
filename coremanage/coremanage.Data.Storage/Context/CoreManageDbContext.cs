using coremanage.Data.Models.Entities;
using Microsoft.EntityFrameworkCore;
using storagecore.EntityFrameworkCore.Context;
using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Data.Models.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using storagecore.Abstractions.Context;

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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserProfileTenant>(entity =>
            {
                entity.HasKey(e => new { e.UserProfileId, e.TenantId });
            });
            builder.Entity<PersonalTenantClaim>(entity =>
            {
                entity.HasKey(e => new { e.PersonalClaimId, e.TenantId });
            });
            builder.Entity<IdentityRoleHierarchy>(entity =>
            {
                entity.HasKey(e => new { e.RoleId, e.ChildRoleId });
            });

            base.OnModelCreating(builder);
        }
    }
}
