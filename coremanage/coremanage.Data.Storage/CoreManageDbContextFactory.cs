using coremanage.Data.Storage.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Storage
{
    public class CoreManageDbContextFactory : IDesignTimeDbContextFactory<CoreManageDbContext>
    {
        public CoreManageDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<CoreManageDbContext>();
            builder.UseSqlServer("data source=SB-153\\SQLEXPRESS ;Initial Catalog=CoreManage2; Integrated Security=True;");
            return new CoreManageDbContext(builder.Options);
        }
    }
}
