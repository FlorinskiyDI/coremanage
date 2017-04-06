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
using coremanage.Core.Contracts.Repositories;
using coremanage.Data.Models.Entities.Identity;
using storagecore.Abstractions.Context;
using storagecore.EntityFrameworkCore.Repositories;

namespace coremanage.Data.Storage.Repositories
{
    public class SecurityRepository : Repository<CoreManageDbContext>, ISecurityRepository
    {
        //private readonly CoreManageDbContext Context;

        public SecurityRepository(ILogger<LoggerDataAccess> logger, CoreManageDbContext context) : base(logger, context)
        {
            //Context = context;
        }

        public async Task<ProfileModel> UserProfileGet(string userId, int companyId)
        {
            
            try
            {
                var query = from users in this.Context.UserProfiles
                            join idn in this.Context.Users on users.Id equals idn.Id
                            where users.IsDeleted == false
                            && idn.Id == userId
                            select new ProfileModel
                            {
                                UserId = users.Id,
                                FirstName = users.FirstName,
                                LastName = users.LastName,
                                UserName = idn.UserName,
                                CompanyId = users.TenantId
                            };

                //ProfileModel model = query.FirstOrDefault();
                ProfileModel model = query.FirstOrDefaultAsync().Result;
                if (companyId != 0 && model.CompanyId != companyId)
            {
                model.CompanyId = companyId;

                // updating the User Profile
                //UserProfile entity = await this.SingleAsync<UserProfile>(model.UserId);

                UserProfile entity = Context.UserProfiles.Where(c => c.Id == model.UserId).FirstOrDefaultAsync().Result;

                entity.TenantId = model.CompanyId;
                Context.Update(entity);
                await this.Context.SaveChangesAsync();
            }

            var companyQuery = from cmp in this.Context.Tenants
                               join usrcmp in this.Context.UserProfileTenants on cmp.Id equals usrcmp.TenantId
                               where usrcmp.UserProfileId == model.UserId
                               && cmp.IsDeleted == false
                               orderby cmp.Name
                               select Mapper.Map<Tenant, CompanyModel>(cmp);
            model.Companies = companyQuery.ToListAsync().Result;

                // getting roles and claims
                await this.UserProfileGetRolesClaims(model);
            return model;
            }
            catch (Exception e)
            {
                var res = e;
                throw;
            }
        }


        public async Task UserProfileGetRolesClaims(ProfileModel model)
        {
            int companyId = model.CompanyId;
            string userId = model.UserId;

            // getting all roles for the current user
            var SuperGroupAdminRoles = new int[] { (int)RoleType.SuperAdmin, (int)RoleType.GroupAdmin, (int)RoleType.TenantAdmin };
            var roleQuery = from userRoles in this.Context.UserRoles
                            join roles in this.Context.Roles on userRoles.RoleId equals roles.Id
                            where userRoles.UserId == userId
                                && SuperGroupAdminRoles.Contains(roles.RoleType)
                            select Mapper.Map<ApplicationRole, RoleModel>(roles);
            var profileRoles = roleQuery.ToListAsync().Result;

            // checking for superadmin
            if (profileRoles.Any(r => r.RoleType == (int)RoleType.SuperAdmin))
            {
                // getting all companies
                model.Companies = (from cmp in this.Context.Tenants where cmp.IsDeleted == false orderby cmp.Name select Mapper.Map<Tenant, CompanyModel>(cmp)).ToListAsync().Result;
                model.AdminRoles = profileRoles.Where(r => r.RoleType == (int)RoleType.SuperAdmin).Select(r => r.Name).ToArray();
                model.Claims = new List<ClaimModel>();
            }
            else if (profileRoles.Any(r => r.RoleType == (int)RoleType.GroupAdmin))
            {
                int[] groupCompanyId = profileRoles.Where(r => r.RoleType == (int)RoleType.GroupAdmin).Select(r => r.CompanyId).ToArray();
                var companies = (from cmp in this.Context.Tenants
                                       where cmp.IsDeleted == false && ((cmp.ParentCompanyId != null && groupCompanyId.Contains(cmp.ParentCompanyId.Value)) || groupCompanyId.Contains(cmp.Id))
                                       select Mapper.Map<Tenant, CompanyModel>(cmp)).ToListAsync().Result;
                model.Companies = companies.Union(model.Companies).OrderBy(c => c.Name).ToList();
                model.AdminRoles = profileRoles.Where(r => r.RoleType == (int)RoleType.GroupAdmin).Select(r => r.Name).ToArray();
                model.Claims = new List<ClaimModel>();
            }

            if (model.AdminRoles == null)
            {
                // getting company admin role
                var companyRoleQuery = from userRoles in this.Context.UserRoles
                                       join roles in this.Context.Roles on userRoles.RoleId equals roles.Id
                                       where userRoles.UserId == userId
                                           && roles.TenantId == companyId
                                           && roles.RoleType == (int)RoleType.TenantAdmin
                                       select roles.Name;
                model.AdminRoles = companyRoleQuery.ToArrayAsync().Result;

                // getting roles claims if user is not a company admin
                if (model.AdminRoles.Length > 0)
                {
                    model.Claims = new List<ClaimModel>();
                }
                else
                {
                    var rolesClaimsQuery = from userRoles in this.Context.UserRoles
                                           join roles in this.Context.Roles on userRoles.RoleId equals roles.Id
                                           join claims in this.Context.RoleClaims on userRoles.RoleId equals claims.RoleId
                                           where userRoles.UserId == userId
                                                 && roles.TenantId == companyId
                                           select Mapper.Map<IdentityRoleClaim<string>, ClaimModel>(claims);

                    var roleClaims = rolesClaimsQuery.ToListAsync().Result;

                    // getting user specific overrides
                    var userClaimsQuery = from claim in this.Context.UserClaims
                                          where claim.UserId == userId
                                          select Mapper.Map<IdentityUserClaim<string>, ClaimModel>(claim);

                    var userClaims = userClaimsQuery.ToListAsync().Result;

                    // get the deny claims and remove them from the main claims
                    string DenySuffix = "_Deny";
                    var denyUserClaims = userClaims.Where(c => c.ClaimType.EndsWith(DenySuffix)).ToList();
                    var denyRoleClaims = denyUserClaims.Select(c => new ClaimModel() { ClaimType = c.ClaimType.Replace(DenySuffix, string.Empty), ClaimValue = c.ClaimValue }).ToList();

                    userClaims = userClaims.Except(denyUserClaims).ToList();
                    roleClaims = roleClaims.Except(denyRoleClaims, new ClaimModelComparer()).ToList();

                    model.Claims = roleClaims.Union(userClaims).ToList();
                }
            }
        }
        public List<Tenant> IdentityCompanyClaimsGet()
        {
            var query = from company in this.Context.Tenants.Include(c => c.IdentityTenantClaims).ThenInclude(a => a.PersonalClaim) select company;
            return query.ToList();
        }
    }
}
