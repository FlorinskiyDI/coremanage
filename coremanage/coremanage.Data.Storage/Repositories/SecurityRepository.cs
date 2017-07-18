using System.Linq;
using coremanage.Core.Contracts.Repositories;
using coremanage.Data.Models.Entities.Identity;
using coremanage.Data.Models.Models;
using coremanage.Data.Storage.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using storagecore.EntityFrameworkCore.Models;
using storagecore.EntityFrameworkCore.Repositories;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using coremanage.Data.Models.Entities;
using coremanage.Core.Common.Constants;

namespace coremanage.Data.Storage.Repositories
{
    public class SecurityRepository : Repository<CoreManageDbContext>, ISecurityRepository
    {

        private readonly UserManager<ApplicationUser> _userManager;

        public SecurityRepository(
            ILogger<LoggerDataAccess> logger,
            CoreManageDbContext context,
            UserManager<ApplicationUser> userManager
        ) : base(logger, context)
        {
            this._userManager = userManager;
        }

        public async Task<bool> CheckTenantforUserAsync(string userName, string tenant)
        {
            var isTenant = await (from users in this.Context.UserProfiles
                            join idn in this.Context.Users on users.Id equals idn.Id
                            join users_tenants in this.Context.UserProfileTenants on idn.Id equals users_tenants.UserProfileId
                            join tenants in this.Context.Tenants on users_tenants.TenantId equals tenants.Id
                            where idn.UserName == userName
                            where tenants.Name == tenant
                                  select tenants)
                            .AnyAsync();
            return isTenant;
        }

        public async Task<Tenant> GetTenantByName(string name)
        {
            return await (from tenants in this.Context.Tenants
                        where  tenants.Name == name
                          select tenants).FirstOrDefaultAsync();
        }

        public async Task<IdentityProfileModel> GetIdentityProfileModel(string userName, string tenant)
        {
            // getting user
            var query = from users in this.Context.UserProfiles
                        join idn in this.Context.Users on users.Id equals idn.Id
                        where idn.UserName == userName
                        select new IdentityProfileModel
                        {
                            UserId = users.Id,
                            FirstName = users.FirstName,
                            MiddleName = users.FirstName,
                            LastName = users.LastName,
                            Email = users.Email
                        };
            var profile = query.FirstOrDefaultAsync().Result;
            var ccc = IdentityAdminRolesGet();
            var vvv = GetGroupCompanyIds();
            // getting roles and claims
            await this.ProfileGetRolesClaims(profile);

            return profile;
        }
        
        private async Task ProfileGetRolesClaims(IdentityProfileModel model)
        {
            // getting all roles for the current user
            string userId = model.UserId;
            var superGroupAdminRoles = new int[] { (int)SystemRoleTypes.SuperAdmin, (int)SystemRoleTypes.GroupAdmin, (int)SystemRoleTypes.TenantAdmin };
            var roleQuery = from userRoles in this.Context.UserRoles
                            join roles in this.Context.Roles on userRoles.RoleId equals roles.Id
                            where userRoles.UserId == userId
                                && superGroupAdminRoles.Contains(roles.RoleType)
                            select (roles);
            var profileRoles = roleQuery.ToListAsync().Result;

            // if roleType SuperAdmin
            if (profileRoles.Any(r => r.RoleType == (int)SystemRoleTypes.SuperAdmin))
            {
                // getting all companies
                model.TenantList = (from cmp in this.Context.Tenants                                    
                                    orderby cmp.Name
                                    select cmp.Name).ToArrayAsync().Result;
                //model.Roles = profileRoles.Where(r => r.RoleType == (int)SystemRoleTypes.SuperAdmin).Select(r => r.Name).ToArray();
            }
            else if (profileRoles.Any(r => r.RoleType == (int)SystemRoleTypes.GroupAdmin))
            {
                int[] groupCompanyId = profileRoles.Where(r => r.RoleType == (int)SystemRoleTypes.GroupAdmin).Select(r => r.TenantId).ToArray();
                var companies = (from cmp in this.Context.Tenants
                                 where ((cmp.ParentTenantId != null && groupCompanyId.Contains(cmp.ParentTenantId.Value)) || groupCompanyId.Contains(cmp.Id))
                                 select cmp.Name).ToListAsync().Result;
                model.TenantList = companies.Union(model.TenantList).ToArray();
                //model.Roles = profileRoles.Where(r => r.RoleType == (int)SystemRoleTypes.GroupAdmin).Select(r => r.Name).ToArray();
                
            }
        }

        public async Task<int[]> GetGroupCompanyIds()
        {
            var groupCompanyId = 2;
            return await (from cmp in this.Context.Tenants
                          where cmp.Id == groupCompanyId || cmp.ParentTenantId == groupCompanyId
                          select cmp.Id).ToArrayAsync();
        }


        public List<ListItem<string, string>> IdentityAdminRolesGet()
        {
            var dbroles = (from roles in this.Context.IdentityRoleHierarchies
                           join role in this.Context.Roles on roles.RoleId equals role.Id
                           join child in this.Context.Roles on roles.ChildRoleId equals child.Id
                           select new ListItem<string, string>() { Key = role.Name, Item = child.Name }).ToList();

            var hierarchy = dbroles.SelectMany(r => this.GetChildren(dbroles, r)).Distinct(new ListItemStringComparer()).OrderBy(r => r.Key).ToList();

            return hierarchy;
        }
        private List<ListItem<string, string>> GetChildren(List<ListItem<string, string>> roles, ListItem<string, string> parent)
        {
            var childroles = roles.Where(r => r.Key == parent.Item).SelectMany(r => this.GetChildren(roles, r));
            var newroles = childroles.Select(r => new ListItem<string, string>() { Key = parent.Key, Item = r.Item }).ToList();

            // adding itself
            newroles.Add(new ListItem<string, string>() { Key = parent.Key, Item = parent.Key });
            newroles.Add(new ListItem<string, string>() { Key = parent.Item, Item = parent.Item });
            newroles.Add(parent);
            return newroles;
        }
    }
}
