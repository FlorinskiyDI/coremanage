using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.DomainModel.Identity
{
    public class IdentityCompanyClaim
    {
        public int IdentityClaimId { get; set; }
        public IdentityClaim IdentityClaim { get; set; }

        public int CompanyId { get; set; }
        public Company Company { get; set; }

    }
}
