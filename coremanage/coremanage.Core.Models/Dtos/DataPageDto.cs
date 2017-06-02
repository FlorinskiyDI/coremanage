using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Models.Dtos
{
    public class DataPageDto<TEntityDto, TKeyDto>
         where TEntityDto : BaseDto<TKeyDto>
    {
        public IEnumerable<TEntityDto> Data { get; set; }
        public long TotalEntityCount { get; set; }

        public int PageNumber { get; set; }
        public int PageLength { get; set; }

        public int TotalPageCount
        {
            get
            {
                return Convert.ToInt32(Math.Ceiling((decimal)TotalEntityCount / PageLength));
            }
        }
    }
}
