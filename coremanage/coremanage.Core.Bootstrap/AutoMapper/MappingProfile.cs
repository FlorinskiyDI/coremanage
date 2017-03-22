using AutoMapper;
using coremanage.Core.Common.DTO.Identity;
using coremanage.Core.Models.Dtos.Identity;
using coremanage.Data.DomainModel.Identity;

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
            CreateMap<Company, CompanyDto>();
            CreateMap<IdentityClaim, IdentityClaimDto>();
            CreateMap<IdentityCompanyClaim, IdentityCompanyClaimDto>();
            CreateMap<UserCompany, UserCompanyDto>();
            CreateMap<UserProfile, UserProfileDto>();
        }
        private void DtoToEntity()
        {
            CreateMap<Company, CompanyDto>();
            CreateMap<IdentityClaim, IdentityClaimDto>();
            CreateMap<IdentityCompanyClaim, IdentityCompanyClaimDto>();
            CreateMap<UserCompany, UserCompanyDto>();
            CreateMap<UserProfile, UserProfileDto>();
        }
    }
}
