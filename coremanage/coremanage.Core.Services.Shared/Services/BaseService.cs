using System.Collections.Generic;
using System.Threading.Tasks;
using coremanage.Core.Services.Shared.API;
using AutoMapper;
using storagecore.Abstractions.Entities;
using storagecore.Abstractions.Uow;
using coremanage.Core.Models.Interfaces;

namespace coremanage.Core.Services.Shared.Services
{
    public abstract class BaseService<TDto, TEntity, TKey> : IBaseService<TDto, TKey>
        where TDto : IBaseDto<TKey>
        where TEntity : IBaseEntity<TKey>
    {
        protected readonly IUowProvider UowProvider;
        protected readonly IMapper Mapper;

        protected BaseService(IUowProvider uowProvider, IMapper mapper)
        {
            this.UowProvider = uowProvider;
            this.Mapper = mapper;
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
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                items = repository.GetAll();
            }
            return Mapper.Map<IEnumerable<TEntity>, IEnumerable<TDto>>(items);
        }

        public Task<IEnumerable<TDto>> GetAllAsync()
        {
            Task<IEnumerable<TEntity>> items;
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                items = repository.GetAllAsync();
            }
            return Mapper.Map<Task<IEnumerable<TEntity>>, Task<IEnumerable<TDto>>>(items);
        }

        public TDto Get(TKey id)
        {
            TEntity item;
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                item = repository.Get(id);
            }
            return Mapper.Map<TEntity, TDto>(item);
        }

        public Task<TDto> GetAsync(TKey id)
        {
            Task<TEntity> item;
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                item = repository.GetAsync(id);
            }
            return Mapper.Map<Task<TEntity>, Task<TDto>>(item);
        }

        public void Add(TDto entity)
        {
            var item = Mapper.Map<TDto, TEntity>(entity);
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                repository.Add(item);
                uow.SaveChanges();
            }
        }

        public TDto Update(TDto entity)
        {
            var item = Mapper.Map<TDto, TEntity>(entity);
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                repository.Update(item);
                uow.SaveChanges();
            }
            return Mapper.Map<TEntity, TDto>(item);
        }

        public void Remove(TDto entity)
        {
            var item = Mapper.Map<TDto, TEntity>(entity);
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                repository.Remove(item);
                uow.SaveChanges();
            }
        }

        public void Remove(TKey id)
        {
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                repository.Remove(id);
                uow.SaveChanges();
            }
        }

        public bool Any()
        {
            bool isAny;
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                isAny = repository.Any();
            }
            return isAny;
        }

        public Task<bool> AnyAsync()
        {
            Task<bool> isAny;
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                isAny = repository.AnyAsync();
            }
            return isAny;
        }


        public int Count()
        {
            int isAny;
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                isAny = repository.Count();
            }
            return isAny;
        }

        public Task<int> CountAsync()
        {
            Task<int> isAny;
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                isAny = repository.CountAsync();
            }
            return isAny;
        }

        public void SetUnchanged(TDto entitieit)
        {
            var item = Mapper.Map<TDto, TEntity>(entitieit);
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<TEntity, TKey>();
                repository.SetUnchanged(item);
                uow.SaveChanges();
            }
        }
    }
}

