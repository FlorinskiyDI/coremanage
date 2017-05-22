using coremanage.Core.Models.Dtos.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace coremanage.Core.Services.Interfaces.Entities
{
    public interface ITenantService : IBaseService<TenantDto, int>
    {
        IEnumerable<TenantDto> GetAllByParentId(int id);
        TenantDto GetByName(string name);
        Task<List<TenantDto>> GetAllByParentName(int name);
    }
}
