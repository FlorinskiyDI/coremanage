using coremanage.Core.Abstraction.Repositories;
using coremanage.Data.Storage.EFCore.Common.DbContexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace coremanage.Data.Storage.EFCore.Common.Repositories
{
    class BaseRepository: IBaseRepository
    {
        protected readonly CoreManageDbContext context;

        public BaseRepository(CoreManageDbContext context)
        {
            this.context = context;
        }

        public virtual IList<T> Get<T>() where T : class
        {
            return this.context.Set<T>().ToList();
        }

        public virtual int Count<T>() where T : class
        {
            return this.context.Set<T>().Count();
        }

        public virtual T GetById<T>(object id) where T : class
        {
            return this.context.Set<T>().Find(id);
        }

        public virtual void Delete<T>(object id) where T : class
        {
            this.context.Set<T>().Remove(this.context.Set<T>().Find(id));
            this.context.SaveChanges();
        }

        public void Save<T>(T data) where T : class
        {
            //needed fo track changes for auidit while change relationships between entities
            if (context.Set<T>().Local.All(d => d != data))
            {
                this.context.Set<T>().Add(data);
                this.context.Entry(data).State = EntityState.Added;
            }
            else
            {
                this.context.Entry(data).State = EntityState.Modified;
            }
            this.context.SaveChanges();
        }
    }
}

