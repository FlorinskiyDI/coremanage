using coremanage.Core.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Models.Dtos
{
    public class BaseDto<TKey> : IBaseDto<TKey>
    {
        public TKey Id { get; set; }
    }
}
