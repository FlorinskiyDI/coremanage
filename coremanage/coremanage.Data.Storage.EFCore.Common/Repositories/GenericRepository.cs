using coremanage.Data.DomainModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Storage.EFCore.Common.Repositories
{

    public class GenericRepository<TEntity> : BaseRepository<DbContext, TEntity>
        where TEntity : BaseEntity, new()
    {
        public GenericRepository(ILogger<DataAccess> logger) : base(logger, null)
        {
            
        }
    }
}
