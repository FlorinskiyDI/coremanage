using coremanage.Core.Contracts.Repositories;
using coremanage.Data.Storage.Context;
using Microsoft.Extensions.Logging;
using storagecore.EntityFrameworkCore.Models;
using storagecore.EntityFrameworkCore.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace coremanage.Data.Storage.Repositories
{
    public class SecurityRepository : Repository<CoreManageDbContext>, ISecurityRepository
    {
        public SecurityRepository(ILogger<LoggerDataAccess> logger, CoreManageDbContext context) : base(logger, context)
        {
        }

        public async Task<string[]> GetTenantListByUserIdAsync(string userId)
        {


            var tenants = await this.Context.UserProfileTenants
                .Where(c => c.UserProfileId == userId)
                .Select(val => val.Tenant.Name).ToArrayAsync();
            return tenants;
        }
    }
}
