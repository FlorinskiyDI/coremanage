using coremanage.Core.Abstraction.Repositories.Entities;
using coremanage.Data.DomainModel.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Storage.EFCore.Common.Repositories.Entities
{
    public class CompanyRepository:BaseRepository<CoreManageDbContext, Company, int>, ICompanyRepository<Company, int>
    {
        protected CompanyRepository(ILogger<DataAccess> logger, CoreManageDbContext context)
            :base(logger, context)
		{ }

        public IEnumerable<Company> GetMy()
        {
            throw new NotImplementedException();
        }
    }
}
