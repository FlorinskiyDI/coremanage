using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace coremanage.Dashboard.WebApi.Models.Tenant
{
    public class TenantUpdateViewModel
    {
        public string Name { get; set; }
        public int ParentId { get; set; }
        public string Description { get; set; }

        // additional properties
        public List<TenantViewModel> TenantList { get; set; }
    }
}
