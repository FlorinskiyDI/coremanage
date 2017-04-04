using AutoMapper;
using coremanage.Core.Common.DTO.Identity;
using coremanage.Core.Models.Dtos.Identity;
using coremanage.Data.Models.Entities;
using coremanage.Data.Models.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

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

            this.CreateMap<Tenant, CompanyModel>();
            this.CreateMap<PersonalClaim, ClaimModel>();
            this.CreateMap<IdentityRoleClaim<string>, ClaimModel>();
            this.CreateMap<IdentityUserClaim<string>, ClaimModel>();
            this.CreateMap<ApplicationRole, RoleModel>(MemberList.Destination);

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
