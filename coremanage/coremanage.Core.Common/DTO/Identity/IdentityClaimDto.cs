using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Common.DTO.Identity
{
    public class IdentityClaimDto: BaseDto<int>
    {
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }
        public string Description { get; set; }

        public List<IdentityCompanyClaimDto> IdentityCompanyClaims { get; set; } // many to many
    }
}
