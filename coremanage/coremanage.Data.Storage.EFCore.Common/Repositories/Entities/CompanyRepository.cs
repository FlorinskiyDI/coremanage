﻿using coremanage.Core.Contracts.Repositories;
using coremanage.Data.DomainModel.Identity;
using Microsoft.Extensions.Logging;
using storagecore.EntityFrameworkCore.Models;
using storagecore.EntityFrameworkCore.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Storage.EFCore.Common.Repositories.Entities
{
    public class CompanyRepository: BaseRepository<CoreManageDbContext, Company, int>, ICompanyRepository
    {
        protected CompanyRepository(ILogger<LoggerDataAccess> logger, CoreManageDbContext context)
            :base(logger, context)
		{ }

        public IEnumerable<Company> GetMy()
        {
            throw new NotImplementedException();
        }
    }
}
