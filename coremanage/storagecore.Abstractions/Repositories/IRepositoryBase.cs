using storagecore.Abstractions.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace storagecore.Abstractions.Repositories
{
    public interface IRepositoryBase
    {
        // get all
        IEnumerable<TEntity> GetAll<TEntity, TKey>(
            Func<IQueryable<TEntity>,
            IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>,
            IQueryable<TEntity>> includes = null
        ) where TEntity : IEntityBase<TKey>;
        Task<IEnumerable<TEntity>> GetAllAsync<TEntity, TKey>(
            Func<IQueryable<TEntity>,
            IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null
        ) where TEntity : IEntityBase<TKey>;

        // get page
        IEnumerable<TEntity> GetPage<TEntity, TKey>(
            int startRij,
            int aantal,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null
        ) where TEntity : IEntityBase<TKey>;
        Task<IEnumerable<TEntity>> GetPageAsync<TEntity, TKey>(
            int startRij,
            int aantal,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null
        ) where TEntity : IEntityBase<TKey>;
        
        // get
        TEntity Get<TEntity, TKey>(
            TKey id,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null
        ) where TEntity : IEntityBase<TKey>;
        Task<TEntity> GetAsync<TEntity, TKey>(
            TKey id,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null
        ) where TEntity : IEntityBase<TKey>;

        // query
        IEnumerable<TEntity> Query<TEntity, TKey>(
            Expression<Func<TEntity, bool>> filter,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null
        ) where TEntity : IEntityBase<TKey>;
        Task<IEnumerable<TEntity>> QueryAsync<TEntity, TKey>(
            Expression<Func<TEntity, bool>> filter,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null
        ) where TEntity : IEntityBase<TKey>;

        // query page
        IEnumerable<TEntity> QueryPage<TEntity, TKey>(
            int startRij,
            int aantal,
            Expression<Func<TEntity, bool>> filter,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null
        ) where TEntity : IEntityBase<TKey>;
        Task<IEnumerable<TEntity>> QueryPageAsync<TEntity, TKey>(
            int startRij,
            int aantal,
            Expression<Func<TEntity, bool>> filter,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null
        ) where TEntity : IEntityBase<TKey>;

        // load
        void Load<TEntity, TKey>(
            Expression<Func<TEntity, bool>> filter,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null
        ) where TEntity : IEntityBase<TKey>;
        Task LoadAsync<TEntity, TKey>(
            Expression<Func<TEntity, bool>> filter,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null
        ) where TEntity : IEntityBase<TKey>;
        
        // add
        void Add<TEntity, TKey>(TEntity entity) where TEntity : IEntityBase<TKey>;

        // update
        TEntity Update<TEntity, TKey>(TEntity entity) where TEntity : IEntityBase<TKey>;

        // remove
        void Remove<TEntity, TKey>(TEntity entity) where TEntity : IEntityBase<TKey>;
        void Remove<TEntity, TKey>(TKey id) where TEntity : IEntityBase<TKey>;

        // any
        bool Any<TEntity, TKey>(Expression<Func<TEntity, bool>> filter = null) where TEntity : IEntityBase<TKey>;
        Task<bool> AnyAsync<TEntity, TKey>(Expression<Func<TEntity, bool>> filter = null) where TEntity : IEntityBase<TKey>;

        // count
        int Count<TEntity, TKey>(Expression<Func<TEntity, bool>> filter = null) where TEntity : IEntityBase<TKey>;
        Task<int> CountAsync<TEntity, TKey>(Expression<Func<TEntity, bool>> filter = null) where TEntity : IEntityBase<TKey>;

        // set unchanged
        void SetUnchanged<TEntity, TKey>(TEntity entitieit) where TEntity : IEntityBase<TKey>;
    }
}
