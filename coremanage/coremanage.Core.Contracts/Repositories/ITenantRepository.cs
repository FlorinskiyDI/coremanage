using coremanage.Data.Models.Entities;
using storagecore.Abstractions.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace coremanage.Core.Contracts.Repositories
{
    public interface ITenantRepository : IBaseRepository<Tenant, int>
    {
        Task<List<Tenant>> GetByParentId(string userId, int parentId);
        Task<List<Tenant>> GetByUserId(string userId);
    }
}
