using coremanage.Core.Abstraction.Uow;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Storage.EFCore.Common.Uow
{
    public class UnitOfWork : BaseUnitOfWork<DbContext>, IUnitOfWork
    {
        public UnitOfWork(DbContext context, IServiceProvider provider) : base(context, provider)
        { }
    }
}
