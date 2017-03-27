using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Models.Entities
{
    public class UserTenant
    {
        public string UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }

        public int TenantId { get; set; }
        public Tenant Tenant { get; set; }
    }
}
