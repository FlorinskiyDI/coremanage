using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace coremanage.Dashboard.WebApi.Models.Tenant
{
    public class TenantCreateViewModel
    {
        public string Name { get; set; }
        public int ParentId { get; set; }
        public string Description { get; set; }

        // Additional properties
        public Dictionary<int, string> TenantList { get; set; }
    }
}
