using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using storagecore.EntityFrameworkCore.Context;

namespace coremanage.Data.Storage.Context
{
    public class GenericDbContext<TContext> : DbContextBase<GenericDbContext<TContext>> where TContext : DbContext
    {
        public GenericDbContext(DbContextOptions<GenericDbContext<TContext>> options) : base(options)
        {
        }
    }


}
