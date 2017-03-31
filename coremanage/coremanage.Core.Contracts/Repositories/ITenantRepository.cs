using coremanage.Data.Models.Entities;
using storagecore.Abstractions.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Contracts.Repositories
{
    public interface ITenantRepository : IBaseRepository<Tenant, int>
    {
    }
}
