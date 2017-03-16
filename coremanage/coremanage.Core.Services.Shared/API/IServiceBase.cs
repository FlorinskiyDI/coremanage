using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace coremanage.Core.Services.Shared.API
{
    public interface IServiceBase<TDto> where TDto : class
    {
        //IEnumerable<TDto> GetAll();
        //Task<IEnumerable<TDto>> GetAllAsync();

        ////IEnumerable<TDto> GetPage();
        ////Task<IEnumerable<TDto>> GetPageAsync();

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
