using coremanage.Core.Abstraction;
using coremanage.Data.DomainModel.API;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.DomainModel
{
    public class BaseEntity<TKey> : IBaseEntity<TKey>
    {
        public TKey Id { get; set; }
    }
}
