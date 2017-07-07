using coremanage.Core.Models.Dtos;
using coremanage.Core.Models.Dtos.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace coremanage.Core.Services.Interfaces.Entities
{
    public interface ITenantService : IBaseService<TenantDto, int>
    {

        Task<TenantDto> GetTenant(int tenantId);
        Task<TenantDto> CreateTenant(TenantDto tenantDto);
        Task<TenantDto> UpdateTenant(TenantDto tenantDto);
        Task<TenantDto> DeleteTenant(int tenantId);

        Task<List<TenantDto>> GetTenantList();
        Task<List<TenantDto>> GetTenantListByParentId(int parentId);

        Task<List<UserProfileDto>> GetTenantMemberListByTenantId(int tenantId);
        Task<List<UserProfileDto>> CreateTenantMember(UserProfileDto userProfileDto);

        Task<DataPageDto<UserProfileDto, string>> GetTenantMemberDataPage(int pageNumber, int pageLenght, int tenantId);
        Task<List<UserProfileDto>> DeleteTenantMember(int userProfileId);
    }
}
