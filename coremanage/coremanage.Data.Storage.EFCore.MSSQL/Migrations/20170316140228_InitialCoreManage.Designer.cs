using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using coremanage.Data.Storage.EFCore.Common;

namespace coremanage.Data.Storage.EFCore.MSSQL.Migrations
{
    [DbContext(typeof(CoreManageDbContext))]
    [Migration("20170316140228_InitialCoreManage")]
    partial class InitialCoreManage
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("coremanage.Data.DomainModel.Identity.Company", b =>
                {
                    b.Property<int>("CompanyId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CompanyName");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("CreatedBy");

                    b.Property<bool>("GroupInd");

                    b.Property<bool>("IsDeleted");

                    b.Property<DateTime>("LastModifiedAt");

                    b.Property<string>("LastModifiedBy");

                    b.Property<int?>("ParentCompanyId");

                    b.HasKey("CompanyId");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("coremanage.Data.DomainModel.Identity.IdentityClaim", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("Description");

                    b.HasKey("Id");

                    b.ToTable("IdentityClaims");
                });

            modelBuilder.Entity("coremanage.Data.DomainModel.Identity.IdentityCompanyClaim", b =>
                {
                    b.Property<int>("IdentityClaimId");

                    b.Property<int>("CompanyId");

                    b.HasKey("IdentityClaimId", "CompanyId");

                    b.HasIndex("CompanyId");

                    b.ToTable("IdentityCompanyClaims");
                });

            modelBuilder.Entity("coremanage.Data.DomainModel.Identity.UserCompany", b =>
                {
                    b.Property<int>("UserProfileId");

                    b.Property<int>("CompanyId");

                    b.Property<string>("UserProfileId1");

                    b.HasKey("UserProfileId", "CompanyId");

                    b.HasIndex("CompanyId");

                    b.HasIndex("UserProfileId1");

                    b.ToTable("UserCompanies");
                });

            modelBuilder.Entity("coremanage.Data.DomainModel.Identity.UserProfile", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CompanyId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("CreatedBy");

                    b.Property<string>("EmailAddress");

                    b.Property<string>("FirstName");

                    b.Property<bool>("IsDeleted");

                    b.Property<DateTime>("LastModifiedAt");

                    b.Property<string>("LastModifiedBy");

                    b.Property<string>("LastName");

                    b.HasKey("Id");

                    b.ToTable("UserProfiles");
                });

            modelBuilder.Entity("coremanage.Data.DomainModel.Identity.IdentityCompanyClaim", b =>
                {
                    b.HasOne("coremanage.Data.DomainModel.Identity.Company", "Company")
                        .WithMany("IdentityCompanyClaims")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("coremanage.Data.DomainModel.Identity.IdentityClaim", "IdentityClaim")
                        .WithMany("IdentityCompanyClaims")
                        .HasForeignKey("IdentityClaimId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("coremanage.Data.DomainModel.Identity.UserCompany", b =>
                {
                    b.HasOne("coremanage.Data.DomainModel.Identity.Company", "Company")
                        .WithMany("UserCompanies")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("coremanage.Data.DomainModel.Identity.UserProfile", "UserProfile")
                        .WithMany("UserCompanies")
                        .HasForeignKey("UserProfileId1");
                });
        }
    }
}
