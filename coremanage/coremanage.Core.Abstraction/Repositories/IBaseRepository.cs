using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Abstraction.Repositories
{
    public interface IBaseRepository
    {
        IList<T> Get<T>() where T : class;
        int Count<T>() where T : class;
        T GetById<T>(object id) where T : class;
        void Delete<T>(object id) where T : class;
        void Save<T>(T data) where T : class;
    }
}
