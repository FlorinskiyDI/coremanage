using coremanage.Core.Contracts.Repositories;
using coremanage.Data.Models.Entities;
using coremanage.Data.Storage.Context;
using Microsoft.Extensions.Logging;
using storagecore.EntityFrameworkCore.Models;
using storagecore.EntityFrameworkCore.Repositories;

namespace coremanage.Data.Storage.Repositories.Entities
{
    public class TenantRepository : BaseRepository<CoreManageDbContext, Tenant, int>, ITenantRepository
    {
        protected TenantRepository(ILogger<LoggerDataAccess> logger, CoreManageDbContext context)
            : base(logger, context)
        {
            var cc = "";
        }

    }
}
