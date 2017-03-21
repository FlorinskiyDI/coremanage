using coremanage.Data.DomainModel.Identity;
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
        public DbSet<Company> Companies { get; set; }
        public DbSet<IdentityClaim> IdentityClaims { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<IdentityCompanyClaim> IdentityCompanyClaims { get; set; }
        public DbSet<UserCompany> UserCompanies { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserCompany>(entity =>
            {
                entity.HasKey(e => new { e.UserProfileId, e.CompanyId });
            });

            builder.Entity<IdentityCompanyClaim>(entity =>
            {
                entity.HasKey(e => new { e.IdentityClaimId, e.CompanyId });
            });

            base.OnModelCreating(builder);
        }
    }
}
