﻿using coremanage.Data.Models.Entities;
using Microsoft.EntityFrameworkCore;
using storagecore.EntityFrameworkCore.Context;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Storage.Context
{
    public class CoreManageDbContext : DbContextBase<CoreManageDbContext>
    {
        public CoreManageDbContext(DbContextOptions<CoreManageDbContext> options) : base(options)
        {
        }

        // Identity entities
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<IdentityClaim> IdentityClaims { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<IdentityTenantClaim> IdentityTenantClaims { get; set; }
        public DbSet<UserTenant> UserTenants { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserTenant>(entity =>
            { 
                entity.HasKey(e => new { e.UserProfileId, e.TenantId });
            });

            builder.Entity<IdentityTenantClaim>(entity =>
            {
                entity.HasKey(e => new { e.IdentityClaimId, e.TenantId });
            });

            base.OnModelCreating(builder);
        }
    }
}
