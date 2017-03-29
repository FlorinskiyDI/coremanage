using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Models.Entities
{
    public class PersonalTenantClaim
    {
        public int PersonalClaimId { get; set; }
        public PersonalClaim PersonalClaim { get; set; }

        public int TenantId { get; set; }
        public Tenant Tenant { get; set; }
    }
}
