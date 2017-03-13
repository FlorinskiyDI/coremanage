using URF.EntityFramework;
using URF.Abstractions.DataContext;
using URF.Abstractions.UnitOfWork;
using URF.Abstractions.Infrastructure;
using coremanage.Core.Abstraction.Repositories;

namespace coremanage.Data.Storage.EFCore.Common.Repositories
{
    public class BaseRepository<TEntity> : Repository<TEntity>, IBaseRepository<TEntity> where TEntity : class, IObjectState
    {
        public BaseRepository(IDataContextAsync context, IUnitOfWorkAsync unitOfWork) : base(context, unitOfWork)
        {
        }
    }
}

