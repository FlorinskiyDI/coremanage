using AutoMapper;
using coremanage.Core.Common.DTO.Identity;
using coremanage.Data.DomainModel.Identity;
using System;
using System.Collections.Generic;
using System.Text;

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
