using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Core.Models.Dtos.Identity;

namespace coremanage.Core.Common.DTO.Identity
{
    public class IdentityCompanyClaimDto
    {
        public int IdentityClaimId { get; set; }
        public IdentityClaimDto IdentityClaim { get; set; }

        public int CompanyId { get; set; }
        public TenantDto Company { get; set; }
    }
}
