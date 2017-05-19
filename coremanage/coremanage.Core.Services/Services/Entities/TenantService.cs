using AutoMapper;
using coremanage.Core.Models.Dtos.Identity;
using coremanage.Core.Services.Interfaces.Entities;
using coremanage.Data.Models.Entities;
using storagecore.Abstractions.Uow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace coremanage.Core.Services.Services.Entities
{
    public class TenantService : BaseService<TenantDto, Tenant, int>, ITenantService
    {
        public TenantService(IUowProvider uowProvider, IMapper mapper)
            :base(uowProvider, mapper)
        {
            
        }

        public IEnumerable<TenantDto> GetAllByParentId(int id)
        {
            IEnumerable<Tenant> items;
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<Tenant, int>();
                
                //Func<Tenant, bool> func = a => a.ParentTenantId == tenantId;
                //Expression<Func<Tenant, bool>> expr = a => func(a);

                items = repository.Query( s => s.ParentTenantId == id);
            }
            return Mapper.Map<IEnumerable<Tenant>, IEnumerable<TenantDto>>(items);
        }
        public TenantDto GetByName(string name)
        {
            Tenant item;
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<Tenant, int>();
                item = repository.Query(s => s.Name == name).FirstOrDefault();
            }
            return Mapper.Map<Tenant, TenantDto>(item);
        }

    }
}
