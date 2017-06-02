using AutoMapper;
using coremanage.Core.Models.Dtos;
using coremanage.Core.Models.Dtos.Identity;
using coremanage.Data.Models.Entities;
using coremanage.Data.Models.Entities.Identity;
using coremanage.Data.Models.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using storagecore.EntityFrameworkCore.Paging;
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
            // paging
            CreateMap(typeof(DataPage<,>), typeof(DataPageDto<,>));
            // entities
            CreateMap<PersonalClaim, PersonalClaimDto>();
            CreateMap<Tenant, TenantDto>();
            CreateMap<UserProfile, UserProfileDto>();
            CreateMap<UserProfileTenant, UserProfileTenantDto>();
        }
        private void DtoToEntity()
        {
            // paging
            CreateMap(typeof(DataPageDto<,>), typeof(DataPage<,>));
            // entities
            CreateMap<PersonalClaimDto, PersonalClaim>();
            CreateMap<TenantDto, Tenant>();
            CreateMap<UserProfileDto, UserProfile>();
            CreateMap<UserProfileTenantDto, UserProfileTenant>();
        }
    }
}
