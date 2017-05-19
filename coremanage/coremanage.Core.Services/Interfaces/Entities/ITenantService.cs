using coremanage.Core.Models.Dtos.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Services.Interfaces.Entities
{
    public interface ITenantService : IBaseService<TenantDto, int>
    {
        IEnumerable<TenantDto> GetAllByParentId(int id);
        TenantDto GetByName(string name);
    }
}
