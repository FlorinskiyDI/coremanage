using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Models.Dtos
{
    public class DataPageDto<TEntityDto, TKeyDto>
         where TEntityDto : BaseDto<TKeyDto>
    {
        public IEnumerable<TEntityDto> Items { get; set; }

        public long TotalItemCount { get; set; }
        public int TotalPageCount => Convert.ToInt32(Math.Ceiling((decimal)TotalItemCount / PageLength));

        public int PageNumber { get; set; }
        public int PageLength { get; set; }

        //public int FilterData { get; set; }
        //public int SortData { get; set; }
    }
}
