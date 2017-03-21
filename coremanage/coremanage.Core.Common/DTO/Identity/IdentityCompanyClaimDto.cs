using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Common.DTO.Identity
{
    public class IdentityCompanyClaimDto
    {
        public int IdentityClaimId { get; set; }
        public IdentityClaimDto IdentityClaim { get; set; }

        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
    }
}
