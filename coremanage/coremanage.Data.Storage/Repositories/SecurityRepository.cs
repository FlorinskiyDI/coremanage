using coremanage.Data.Storage.Context;
using Microsoft.Extensions.Logging;
using storagecore.EntityFrameworkCore.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using coremanage.Data.Models.Models;
using coremanage.Data.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace coremanage.Data.Storage.Repositories
{
    class SecurityRepository
    {
        private readonly CoreManageDbContext DbContext;

        protected SecurityRepository(ILogger<LoggerDataAccess> logger, CoreManageDbContext context, CoreManageDbContext coreManageDbContext)
        {
            DbContext = coreManageDbContext;
        }

        public async Task UserProfileGetRolesClaims(ProfileModel model)
        {
            int companyId = model.CompanyId;
            string userId = model.UserId;

            // getting all roles for the current user
            var SuperGroupAdminRoles = new int[] { (int)RoleType.SuperAdmin, (int)RoleType.GroupAdmin, (int)RoleType.TenantAdmin };
            var roleQuery = from userRoles in this.DbContext.UserRoles
                            join roles in this.DbContext.Roles on userRoles.RoleId equals roles.Id
                            where userRoles.UserId == userId
                                && SuperGroupAdminRoles.Contains(roles.RoleType)
                            select Mapper.Map<ApplicationRole, RoleModel>(roles);
            var profileRoles = await roleQuery.ToListAsync();

            // checking for superadmin
            if (profileRoles.Any(r => r.RoleType == (int)RoleType.SuperAdmin))
            {
                // getting all companies
                model.Companies = await (from cmp in this.DbContext.Tenants where cmp.IsDeleted == false orderby cmp.Name select Mapper.Map<Tenant, CompanyModel>(cmp)).ToListAsync();
                model.AdminRoles = profileRoles.Where(r => r.RoleType == (int)RoleType.SuperAdmin).Select(r => r.Name).ToArray();
                model.Claims = new List<ClaimModel>();
            }
            else if (profileRoles.Any(r => r.RoleType == (int)RoleType.GroupAdmin))
            {
                int[] groupCompanyId = profileRoles.Where(r => r.RoleType == (int)RoleType.GroupAdmin).Select(r => r.CompanyId).ToArray();
                var companies = await (from cmp in this.DbContext.Tenants
                                       where cmp.IsDeleted == false && ((cmp.ParentCompanyId != null && groupCompanyId.Contains(cmp.ParentCompanyId.Value)) || groupCompanyId.Contains(cmp.Id))
                                       select Mapper.Map<Tenant, CompanyModel>(cmp)).ToListAsync();
                model.Companies = companies.Union(model.Companies).OrderBy(c => c.CompanyName).ToList();
                model.AdminRoles = profileRoles.Where(r => r.RoleType == (int)RoleType.GroupAdmin).Select(r => r.Name).ToArray();
                model.Claims = new List<ClaimModel>();
            }

            //if (model.AdminRoles == null)
            //{
            //    // getting company admin role
            //    var companyRoleQuery = from userRoles in this.DbContext.UserRoles
            //                           join roles in this.DbContext.Roles on userRoles.RoleId equals roles.Id
            //                           where userRoles.UserId == userId
            //                               && roles.CompanyId == companyId
            //                               && roles.RoleType == (int)RoleType.CompanyAdmin
            //                           select roles.Name;
            //    model.AdminRoles = await companyRoleQuery.ToArrayAsync();

            //    // getting roles claims if user is not a company admin
            //    if (model.AdminRoles.Length > 0)
            //    {
            //        model.Claims = new List<ClaimModel>();
            //    }
            //    else
            //    {
            //        var rolesClaimsQuery = from userRoles in this.DbContext.UserRoles
            //                               join roles in this.DbContext.Roles on userRoles.RoleId equals roles.Id
            //                               join claims in this.DbContext.RoleClaims on userRoles.RoleId equals claims.RoleId
            //                               where userRoles.UserId == userId
            //                                     && roles.CompanyId == companyId
            //                               select Mapper.Map<IdentityRoleClaim<string>, ClaimModel>(claims);

            //        var roleClaims = await rolesClaimsQuery.ToListAsync();

            //        // getting user specific overrides
            //        var userClaimsQuery = from claim in this.DbContext.UserClaims
            //                              where claim.UserId == userId
            //                              select Mapper.Map<IdentityUserClaim<string>, ClaimModel>(claim);

            //        var userClaims = await userClaimsQuery.ToListAsync();

            //        // get the deny claims and remove them from the main claims
            //        var denyUserClaims = userClaims.Where(c => c.ClaimType.EndsWith(SecuritySettings.DenySuffix)).ToList();
            //        var denyRoleClaims = denyUserClaims.Select(c => new ClaimModel() { ClaimType = c.ClaimType.Replace(SecuritySettings.DenySuffix, string.Empty), ClaimValue = c.ClaimValue }).ToList();

            //        userClaims = userClaims.Except(denyUserClaims).ToList();
            //        roleClaims = roleClaims.Except(denyRoleClaims, new ClaimModelComparer()).ToList();

            //        model.Claims = roleClaims.Union(userClaims).ToList();
            //    }
            //}
        }
        public List<Tenant> IdentityCompanyClaimsGet()
        {
            var query = from company in this.DbContext.Tenants.Include(c => c.IdentityTenantClaims).ThenInclude(a => a.PersonalClaim) select company;
            return query.ToList();
        }
    }
}
