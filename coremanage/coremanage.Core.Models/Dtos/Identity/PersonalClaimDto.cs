using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Models.Dtos.Identity
{
    public class PersonalClaimDto
    {
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }
        public string Description { get; set; }

        public virtual ICollection<PersonalTenantClaimDto> IdentityTenantClaims { get; set; } // many to many
    }
}
