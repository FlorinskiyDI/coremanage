using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Models.Dtos.Identity
{
    public class PersonalTenantClaimDto
    {
        public int PersonalClaimId { get; set; }
        public PersonalClaimDto PersonalClaim { get; set; }

        public int TenantId { get; set; }
        public TenantDto Tenant { get; set; }
    }
}
