using coremanage.Dashboard.WebApi.Models.Tenant;
using System.Collections.Generic;

namespace coremanage.Dashboard.WebApi.Models.UserProfile
{
    public class UserCreateViewModel
    {
        public string Email { get; set; }
        public int TenantId { get; set; }

        // additional properties
        public  List<TenantViewModel> TenantList { get; set; }
    }
}
