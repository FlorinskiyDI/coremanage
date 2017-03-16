using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using coremanage.Core.Services.Shared.API;
using coremanage.Core.Abstraction.Uow;

namespace coremanage.Core.Services.Shared.Services
{
    class ServiceBase<TEntity,TDto> : IServiceBase<TDto> where TDto : class
    {
        protected readonly IUowProvider _uowProvider;

        public ServiceBase(IUowProvider uowProvider)
        {
            _uowProvider = uowProvider;
        }

        // Example
        //using (var uow = _uowProvider.CreateUnitOfWork())
        //{
        //    var repository = uow.GetRepository<TDto>();
        //    uow.SaveChanges();
        //}

        //public IEnumerable<TDto> GetAll()
        //{
        //    IEnumerable<TDto> items;
        //    using (var uow = _uowProvider.CreateUnitOfWork())
        //    {
        //        var repository = uow.GetRepository<TEntity>();
        //        items = repository.GetAll();
        //        uow.SaveChanges();
        //    }
        //    return items;
        //}

        //public Task<IEnumerable<TDto>> GetAllAsync()
        //{
        //    Task<IEnumerable<TDto>> items;
        //    using (var uow = _uowProvider.CreateUnitOfWork())
        //    {
        //        var repository = uow.GetRepository<TEntity>();
        //        items = repository.GetAllAsync();
        //        uow.SaveChanges();
        //    }
        //    return items;
        //}

        //TDto Get(int id);
        //Task<TDto> GetAsync(int id);

        //void Add(TDto entity);

        //TDto Update(TDto entity);

        //void Remove(TDto entity);
        //void Remove(int id);

        //bool Any();
        //Task<bool> AnyAsync();

        //int Count();
        //Task<int> CountAsync();

        //void SetUnchanged(TDto entitieit);
    }
}
