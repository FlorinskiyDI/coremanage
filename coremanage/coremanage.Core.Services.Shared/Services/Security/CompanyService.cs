using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using coremanage.Core.Abstraction.Uow;
using coremanage.Core.Common.DTO.Identity;
using coremanage.Core.Services.Shared.API.Security;
using coremanage.Data.DomainModel.Identity;

namespace coremanage.Core.Services.Shared.Services.Security
{
    public class CompanyService: BaseService<CompanyDto, Company, int>, ICompanyService
    {
        public CompanyService(IUowProvider uowProvider, IMapper mapper)
            :base(uowProvider, mapper)
        {
            
        }
    }
}
