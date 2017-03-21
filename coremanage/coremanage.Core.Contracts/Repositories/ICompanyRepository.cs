using coremanage.Data.DomainModel.Identity;
using storagecore.Abstractions.Repositories;

namespace coremanage.Core.Contracts.Repositories
{
    public interface ICompanyRepository: IBaseRepository<Company, int>
    {
    }
}
