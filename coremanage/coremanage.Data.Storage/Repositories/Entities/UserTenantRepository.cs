using coremanage.Data.Storage.Context;
using storagecore.EntityFrameworkCore.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Data.Models.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using storagecore.EntityFrameworkCore.Models;

namespace coremanage.Data.Storage.Repositories.Entities
{
    class UserTenantRepository : Repository<CoreManageDbContext>
    {
        public UserTenantRepository(
            ILogger<LoggerDataAccess> logger,
            CoreManageDbContext context
        ) : base(logger, context)
        {
            
        }
    
    }
}
