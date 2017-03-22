using AutoMapper;
using coremanage.Core.Models.Dtos.Identity;
using coremanage.Core.Services.Shared.API.Security;
using coremanage.Data.DomainModel.Identity;
using storagecore.Abstractions.Uow;

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
