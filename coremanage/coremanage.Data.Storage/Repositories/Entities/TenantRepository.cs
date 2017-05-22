using System.Collections.Generic;
using System.Linq;
using coremanage.Core.Contracts.Repositories;
using coremanage.Data.Models.Entities;
using coremanage.Data.Storage.Context;
using Microsoft.Extensions.Logging;
using storagecore.EntityFrameworkCore.Models;
using storagecore.EntityFrameworkCore.Repositories;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace coremanage.Data.Storage.Repositories.Entities
{
    public class TenantRepository : BaseRepository<CoreManageDbContext, Tenant, int>, ITenantRepository
    {
        public TenantRepository(ILogger<LoggerDataAccess> logger)
            : base(logger, null)
        {
        }

        public async Task<List<Tenant>> GetAllByParentName(string userName, int parentId)
        {
            var tenantList = await (from users in this.Context.UserProfiles
                                  join idn in this.Context.Users on users.Id equals idn.Id
                                  join usersTenants in this.Context.UserProfileTenants on idn.Id equals usersTenants.UserProfileId
                                  join tenants in this.Context.Tenants on usersTenants.TenantId equals tenants.Id
                                  where users.IsDeleted == false && idn.UserName == userName
                                  where tenants.IsDeleted == false && tenants.ParentTenantId == parentId
                                    select tenants)
                            .ToListAsync();
            return tenantList;
        }

    }
}
