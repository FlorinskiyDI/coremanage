using AutoMapper;
using coremanage.Core.Common.DTO.Identity;
using coremanage.Core.Models.Dtos.Identity;
using coremanage.Data.Models.Entities;

namespace coremanage.Core.Bootstrap.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            EntityToDto();
            DtoToEntity();
        }
       

        private void EntityToDto()
        {
            CreateMap<Tenant, TenantDto>();
            //CreateMap<IdentityClaim, IdentityClaimDto>();
            //CreateMap<IdentityCompanyClaim, IdentityCompanyClaimDto>();
            //CreateMap<UserCompany, UserCompanyDto>();
            //CreateMap<UserProfile, UserProfileDto>();
        }
        private void DtoToEntity()
        {
            CreateMap<TenantDto, Tenant>();
            //CreateMap<IdentityClaim, IdentityClaimDto>();
            //CreateMap<IdentityCompanyClaim, IdentityCompanyClaimDto>();
            //CreateMap<UserCompany, UserCompanyDto>();
            //CreateMap<UserProfile, UserProfileDto>();
        }
    }
}
