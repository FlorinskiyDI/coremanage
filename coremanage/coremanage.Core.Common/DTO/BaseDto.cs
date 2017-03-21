using coremanage.Core.Common.API;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Common.DTO
{
    public class BaseDto<TKey> : IBaseDto<TKey>
    {
        public TKey Id { get; set; }
    }
}
