using System.Collections.Generic;
using System.Threading.Tasks;
using coremanage.Core.Services.Shared.API;
using coremanage.Core.Common.API;
using AutoMapper;
using storagecore.Abstractions.Entities;
using storagecore.Abstractions.Uow;

namespace coremanage.Core.Services.Shared.Services
{
    public abstract class BaseService<TDto, TEntity, TKey> : IBaseService<TDto, TKey>
        where TDto : IBaseDto<TKey>
        where TEntity : IBaseEntity<TKey>
    {
        private readonly IUowProvider _uowProvider;
        private readonly IMapper _mapper;

        protected BaseService(IUowProvider uowProvider, IMapper mapper)
        {
            this._uowProvider = uowProvider;
            this._mapper = mapper;
        }

        /* Example
        using (var uow = _uowProvider.CreateUnitOfWork())
        {
            var repository = uow.GetRepository<TEntity, TKey>();
        //    uow.SaveChanges();
        }
        */

        public IEnumerable<TDto> GetAll()
        {
            IEnumerable<TEntity> items;
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                items = repository.GetAll();
            }
            return _mapper.Map<IEnumerable<TEntity>, IEnumerable<TDto>>(items);
        }

        public Task<IEnumerable<TDto>> GetAllAsync()
        {
            Task<IEnumerable<TEntity>> items;
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                items = repository.GetAllAsync();
            }
            return _mapper.Map<Task<IEnumerable<TEntity>>, Task<IEnumerable<TDto>>>(items);
        }

        public TDto Get(TKey id)
        {
            TEntity item;
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                item = repository.Get(id);
            }
            return _mapper.Map<TEntity, TDto>(item);
        }

        public Task<TDto> GetAsync(TKey id)
        {
            Task<TEntity> item;
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                item = repository.GetAsync(id);
            }
            return _mapper.Map<Task<TEntity>, Task<TDto>>(item);
        }

        public void Add(TDto entity)
        {
            var item = _mapper.Map<TDto, TEntity>(entity);
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                repository.Add(item);
                uow.SaveChanges();
            }
        }

        public TDto Update(TDto entity)
        {
            var item = _mapper.Map<TDto, TEntity>(entity);
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                repository.Update(item);
                uow.SaveChanges();
            }
            return _mapper.Map<TEntity, TDto>(item);
        }

        public void Remove(TDto entity)
        {
            var item = _mapper.Map<TDto, TEntity>(entity);
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                repository.Remove(item);
                uow.SaveChanges();
            }
        }

        public void Remove(TKey id)
        {
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                repository.Remove(id);
                uow.SaveChanges();
            }
        }

        public bool Any()
        {
            bool isAny;
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                isAny = repository.Any();
            }
            return isAny;
        }

        public Task<bool> AnyAsync()
        {
            Task<bool> isAny;
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                isAny = repository.AnyAsync();
            }
            return isAny;
        }


        public int Count()
        {
            int isAny;
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                isAny = repository.Count();
            }
            return isAny;
        }

        public Task<int> CountAsync()
        {
            Task<int> isAny;
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                isAny = repository.CountAsync();
            }
            return isAny;
        }

        public void SetUnchanged(TDto entitieit)
        {
            var item = _mapper.Map<TDto, TEntity>(entitieit);
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                repository.SetUnchanged(item);
                uow.SaveChanges();
            }
        }
    }
}

