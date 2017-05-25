using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Models.Interfaces
{
    public interface IBaseDto<TKey>
    {
        TKey Id { get; set; }
    }
}
