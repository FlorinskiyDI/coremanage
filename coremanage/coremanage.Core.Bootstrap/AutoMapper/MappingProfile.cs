using AutoMapper;
using coremanage.Core.Models.Dtos.Identity;
using coremanage.Data.Models.Entities;
using coremanage.Data.Models.Entities.Identity;
using coremanage.Data.Models.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Collections.Generic;

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
            CreateMap<PersonalClaim, PersonalClaimDto>();
            //CreateMap<PersonalTenantClaim, PersonalTenantClaimDto>();
            CreateMap<Tenant, TenantDto>();
            CreateMap<UserProfile, UserProfileDto>();
            CreateMap<UserProfileTenant, UserProfileTenantDto>();

            //CreateMap<ICollection<UserProfileTenant>, ICollection<UserProfileTenantDto>>();

            //CreateMap<IdentityClaim, IdentityClaimDto>();
            //CreateMap<IdentityCompanyClaim, IdentityCompanyClaimDto>();
            //CreateMap<UserCompany, UserCompanyDto>();


        }
        private void DtoToEntity()
        {
            CreateMap<PersonalClaimDto, PersonalClaim>();
            //CreateMap<PersonalTenantClaimDto, PersonalTenantClaim>();
            CreateMap<TenantDto, Tenant>();
            CreateMap<UserProfileDto, UserProfile>();
            CreateMap<UserProfileTenantDto, UserProfileTenant>();
            //CreateMap<ICollection<UserProfileTenantDto>, ICollection<UserProfileTenant>>();


        }
    }
}
