using coremanage.Core.Contracts.Repositories;
using coremanage.Data.Models.Entities;
using coremanage.Data.Storage.Context;
using Microsoft.Extensions.Logging;
using storagecore.EntityFrameworkCore.Models;
using storagecore.EntityFrameworkCore.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace coremanage.Data.Storage.Repositories.Entities
{
    class IdentityRoleHierarchyRepository : BaseRepository<CoreManageDbContext, IdentityRoleHierarchy, int>, IIdentityRoleHierarchyRepository
    {
        protected IdentityRoleHierarchyRepository(ILogger<LoggerDataAccess> logger, CoreManageDbContext context)
            : base(logger, context)
        { }

        
    }
}
