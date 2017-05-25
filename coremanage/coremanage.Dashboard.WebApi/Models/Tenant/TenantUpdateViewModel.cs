using coremanage.Core.Models.Dtos.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace coremanage.Dashboard.WebApi.Models.Tenant
{
    public class TenantUpdateViewModel
    {
        public TenantDto Tenant { get; set; }
        // additional properties
        public List<TenantViewModel> TenantList { get; set; }
    }
}
