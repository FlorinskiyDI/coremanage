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
using coremanage.Core.Common.Constants;
using Microsoft.EntityFrameworkCore;

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

        public async Task<IdentityProfileModel> GetIdentityProfileModel(string userName, string tenant)
        {
            // getting user
            var query = from users in this.Context.UserProfiles
                        join idn in this.Context.Users on users.Id equals idn.Id
                        where users.IsDeleted == false
                        && idn.UserName == userName
                        select new IdentityProfileModel
                        {
                            UserId = users.Id,
                            FirstName = users.FirstName,
                            MiddleName = users.FirstName,
                            LastName = users.LastName,
                            Email = users.EmailAddress
                        };
            var profile = query.FirstOrDefaultAsync().Result;

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
                                    where cmp.IsDeleted == false
                                    orderby cmp.Name
                                    select cmp.Name).ToArrayAsync().Result;
                //model.Roles = profileRoles.Where(r => r.RoleType == (int)SystemRoleTypes.SuperAdmin).Select(r => r.Name).ToArray();
            }
            else if (profileRoles.Any(r => r.RoleType == (int)SystemRoleTypes.GroupAdmin))
            {
                int[] groupCompanyId = profileRoles.Where(r => r.RoleType == (int)SystemRoleTypes.GroupAdmin).Select(r => r.TenantId).ToArray();
                var companies = (from cmp in this.Context.Tenants
                                 where cmp.IsDeleted == false && ((cmp.ParentCompanyId != null && groupCompanyId.Contains(cmp.ParentCompanyId.Value)) || groupCompanyId.Contains(cmp.Id))
                                 select cmp.Name).ToListAsync().Result;
                model.TenantList = companies.Union(model.TenantList).ToArray();
                //model.Roles = profileRoles.Where(r => r.RoleType == (int)SystemRoleTypes.GroupAdmin).Select(r => r.Name).ToArray();
                
            }
        }
    }
}
