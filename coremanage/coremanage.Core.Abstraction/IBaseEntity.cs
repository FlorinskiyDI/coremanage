using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Abstraction
{
    public interface IBaseEntity<TKey>
    {
        TKey Id { get; set; }
    }
}
