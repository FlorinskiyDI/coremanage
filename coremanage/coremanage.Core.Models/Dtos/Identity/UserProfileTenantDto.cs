using System;
using System.Collections.Generic;

namespace coremanage.Core.Models.Dtos.Identity
{
    public class UserProfileTenantDto
    {
        public string UserProfileId { get; set; }
        public UserProfileDto UserProfile { get; set; }

        public int TenantId { get; set; }
        public TenantDto Tenant { get; set; }
    }
}
