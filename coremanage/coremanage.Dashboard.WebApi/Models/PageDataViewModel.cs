using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace coremanage.Dashboard.WebApi.Models
{
    public class PageDataViewModel{

        public int TotalItemCount { get; set; }
        //public int TotalPageCount => Convert.ToInt32(Math.Ceiling((decimal)TotalItemCount / PageLength));

        public int PageNumber { get; set; }
        public int PageLength { get; set; }

        //public object FilterData { get; set; }
        //public object SortData { get; set; }
    }
}
