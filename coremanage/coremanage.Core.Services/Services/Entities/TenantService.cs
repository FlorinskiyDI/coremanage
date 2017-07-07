using System;
using AutoMapper;
using coremanage.Core.Common.Context;
using coremanage.Core.Contracts.Repositories;
using coremanage.Core.Models.Dtos.Identity;
using coremanage.Core.Services.Interfaces.Entities;
using coremanage.Data.Models.Entities;
using storagecore.Abstractions.Uow;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using coremanage.Core.Models.Dtos;
using Microsoft.EntityFrameworkCore;
using storagecore.EntityFrameworkCore.Paging;
using storagecore.EntityFrameworkCore.Query;

namespace coremanage.Core.Services.Services.Entities
{
    public class TenantService : BaseService<TenantDto, Tenant, int>, ITenantService
    {

        protected readonly IDataPager<UserProfile, string> Pager;

        public TenantService(
            IUowProvider uowProvider,
            IMapper mapper,
            IDataPager<UserProfile, string> pager)
            : base(uowProvider, mapper)
        {
            this.Pager = pager;
        }

        #region "Tenant"

        public async Task<TenantDto> GetTenant(int tenantId)
        {
            TenantDto tenantDto;

            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repositoryTenant = uow.GetRepository<Tenant, int>();
                var tenant = await repositoryTenant.GetAsync(tenantId);
                tenantDto = Mapper.Map<Tenant, TenantDto>(tenant);
            }
            return tenantDto;
        }

        public async Task<TenantDto> CreateTenant(TenantDto tenantDto)
        {
            var tenant = Mapper.Map<TenantDto, Tenant>(tenantDto);

            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repositoryTenant = uow.GetRepository<Tenant, int>();
                var repositoryUser = uow.GetRepository<UserProfile, string>();

                var userProfile = await repositoryUser.GetAsync(NTContext.Context.UserId);
                try
                {
                    tenant.UserProfileTenants.Add(new UserProfileTenant
                    {
                        Tenant = tenant,
                        UserProfile = userProfile
                    });
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
               
                await repositoryTenant.AddAsync(tenant);
                await uow.SaveChangesAsync();
            }

            return  Mapper.Map<Tenant, TenantDto>(tenant);
        }
        
        public async Task<TenantDto> UpdateTenant(TenantDto tenantDto)
        {
            var tenant = Mapper.Map<TenantDto, Tenant>(tenantDto);

            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repositoryTenant = uow.GetRepository<Tenant, int>();
                repositoryTenant.Update(tenant);
                await uow.SaveChangesAsync();
            }

            return Mapper.Map<Tenant, TenantDto>(tenant);
        }

        public Task<TenantDto> DeleteTenant(int tenantId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<TenantDto>> GetTenantList()
        {
            List<Tenant> tenantList;
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetCustomRepository<ITenantRepository>();
                tenantList = await repository.GetByUserId(NTContext.Context.UserId);
            }

            return Mapper.Map<List<Tenant>, List<TenantDto>>(tenantList);
        }

        public async Task<List<TenantDto>> GetTenantListByParentId(int parentId)
        {
            List<Tenant> tenantList;
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetCustomRepository<ITenantRepository>();
                tenantList = await repository.GetByParentId(NTContext.Context.UserId, parentId);
            }

            return Mapper.Map<List<Tenant>, List<TenantDto>>(tenantList);
        }

        #endregion

        #region "Tenant member"

        public async Task<DataPageDto<UserProfileDto, string>> GetTenantMemberDataPage(int pageNumber, int pageLenght, int tenantId)
        {
            // geting id list of users by tenantId
            List<string> idList;
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repositoryTenant = uow.GetRepository<Tenant, int>();
                var tenant = await repositoryTenant.GetAsync(tenantId, s => s.Include(c => c.UserProfileTenants).ThenInclude(v => v.UserProfile));
                idList = tenant.UserProfileTenants.Select(s => s.UserProfileId).ToList();
            }

            // createing filter and paging of user table
            var filter = new Filter<UserProfile>(null);
            filter.AddExpression(e => idList.Contains(e.Id));
            var dataPage = await Pager.QueryAsync( pageNumber, pageLenght, filter );
            var dataPageDto = Mapper.Map<DataPage<UserProfile, string>, DataPageDto<UserProfileDto, string>>(dataPage);

            return dataPageDto;
        }

        public async Task<List<UserProfileDto>> GetTenantMemberListByTenantId(int tenantId)
        {
            Tenant tenant;

            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<Tenant, int>();
                tenant = await repository.GetAsync(tenantId, s => s.Include(c => c.UserProfileTenants).ThenInclude(v => v.UserProfile));
            }
            var tenantMemberList = tenant.UserProfileTenants.Select(c => c.UserProfile).ToList();

            return Mapper.Map<List<UserProfile>, List<UserProfileDto>>(tenantMemberList);
        }

        public Task<List<UserProfileDto>> CreateTenantMember(UserProfileDto userProfileDto)
        {
            throw new NotImplementedException();
        }

        public Task<List<UserProfileDto>> DeleteTenantMember(int userProfileId)
        {
            throw new NotImplementedException();
        }

        #endregion

    }
}
