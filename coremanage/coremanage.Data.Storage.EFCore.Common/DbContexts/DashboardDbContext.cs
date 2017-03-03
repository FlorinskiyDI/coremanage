using coremanage.Data.DomainModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace coremanage.Data.Storage.EFCore.Common.DbContexts
{

    public class DashboardDbContext : DbContext
    {
        public DashboardDbContext(DbContextOptions<DashboardDbContext> options) : base(options)
        {
        }

        // public DbSet<Course> Courses { get; set; }
        /// <summary>  
        /// Overriding Save Changes  
        /// </summary>  
        /// <returns></returns>  
        public override int SaveChanges(
            
       
        )
        {
            var selectedEntityList = ChangeTracker.Entries()
                                    .Where(x => x.Entity is IAuditedEntity &&
                                    (x.State == EntityState.Added || x.State == EntityState.Modified));

            
            foreach (var entity in selectedEntityList)
            {
                ((IAuditedEntity)entity.Entity).LastModifiedBy = "IdUser";
                ((IAuditedEntity)entity.Entity).LastModifiedAt = DateTime.Now;





                //public string LastModifiedBy { get; set; }
                //public DateTime LastModifiedAt { get; set; }


            }

            return base.SaveChanges();
        }
    }
}
