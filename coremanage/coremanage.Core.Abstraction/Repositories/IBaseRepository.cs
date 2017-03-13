using System;
using System.Collections.Generic;
using System.Text;
using URF.Abstractions.Infrastructure;
using URF.Abstractions.Repositories;

namespace coremanage.Core.Abstraction.Repositories
{
    public interface IBaseRepository<TEntity> : IRepository<TEntity> where TEntity : class, IObjectState
    {
    }
}
