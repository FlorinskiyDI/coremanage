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

namespace coremanage.Core.Services.Services.Entities
{
    public class TenantService : BaseService<TenantDto, Tenant, int>, ITenantService
    {
        public TenantService(IUowProvider uowProvider, IMapper mapper)
            : base(uowProvider, mapper)
        {

        }

        public async Task<List<TenantDto>> GetTenantsByParentId(int parentId)
        {
            List<Tenant> tenantList;
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetCustomRepository<ITenantRepository>();
                tenantList = await repository.GetByParentId(NTContext.Context.UserId, parentId);
            }

            return Mapper.Map<List<Tenant>, List<TenantDto>>(tenantList);
        }

        public async Task<List<TenantDto>> GetTenants()
        {
            List<Tenant> tenantList;
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetCustomRepository<ITenantRepository>();
                tenantList = await repository.GetByUserId(NTContext.Context.UserId);
            }

            return Mapper.Map<List<Tenant>, List<TenantDto>>(tenantList);
        }

        public async Task<TenantDto> CreateTenant(TenantDto tenantDto)
        {
            var tenant = Mapper.Map<TenantDto, Tenant>(tenantDto);

            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repositoryTenant = uow.GetRepository<Tenant, int>();
                var repositoryUser = uow.GetRepository<UserProfile, string>();

                var userProfile = await repositoryUser.GetAsync(NTContext.Context.UserId);
                tenant.UserTenants.Add(new UserProfileTenant
                {
                    Tenant = tenant,
                    UserProfile = userProfile
                });
                await repositoryTenant.AddAsync(tenant);
                await uow.SaveChangesAsync();
            }

            return  Mapper.Map<Tenant, TenantDto>(tenant);
        }
    }
}
