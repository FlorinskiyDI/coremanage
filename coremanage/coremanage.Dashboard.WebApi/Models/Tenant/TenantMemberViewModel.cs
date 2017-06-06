using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using coremanage.Core.Models.Dtos;

namespace coremanage.Dashboard.WebApi.Models.Tenant
{
    public class TenantMemberViewModel: BaseDto<string>
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
    }
}
