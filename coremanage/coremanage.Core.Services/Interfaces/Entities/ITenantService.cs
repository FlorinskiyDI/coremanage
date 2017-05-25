﻿using coremanage.Core.Models.Dtos.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace coremanage.Core.Services.Interfaces.Entities
{
    public interface ITenantService : IBaseService<TenantDto, int>
    {

        Task<TenantDto> CreateTenant(TenantDto tenantDto);
        Task<TenantDto> UpdateTenant(TenantDto tenantDto);
        Task<TenantDto> GetTenant(int tenantId);
        Task<List<TenantDto>> GetTenants();
        Task<List<TenantDto>> GetTenantsByParentId(int parentId);

    }
}
