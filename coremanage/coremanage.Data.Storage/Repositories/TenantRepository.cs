using coremanage.Core.Contracts.Repositories;
using coremanage.Data.Storage.Context;
using storagecore.EntityFrameworkCore.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Data.Models.Entities;
using Microsoft.Extensions.Logging;
using storagecore.EntityFrameworkCore.Models;

namespace coremanage.Data.Storage.Repositories
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
