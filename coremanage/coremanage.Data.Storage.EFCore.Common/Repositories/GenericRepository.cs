using coremanage.Data.DomainModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Storage.EFCore.Common.Repositories
{

    public class GenericRepository<TEntity, TKey> : BaseRepository<DbContext, TEntity, TKey>
        where TEntity : BaseEntity<TKey>, new()
    {
        public GenericRepository(ILogger<DataAccess> logger) : base(logger, null)
        {
            
        }
    }
}
