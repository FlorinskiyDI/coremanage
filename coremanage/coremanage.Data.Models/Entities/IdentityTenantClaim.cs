using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Models.Entities
{
    public class IdentityTenantClaim
    {
        public int IdentityClaimId { get; set; }
        public IdentityClaim IdentityClaim { get; set; }

        public int TenantId { get; set; }
        public Tenant Tenant { get; set; }
    }
}
