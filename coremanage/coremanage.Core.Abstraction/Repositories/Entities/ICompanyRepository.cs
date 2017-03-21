using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Abstraction.Repositories.Entities
{
    public interface ICompanyRepository<TEntity, TKey>: IBaseRepository<TEntity, TKey> where TEntity : IBaseEntity<TKey>
    {
        
    }
}
