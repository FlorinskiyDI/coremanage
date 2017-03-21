using storagecore.EntityFrameworkCore.Entities;
using System.Collections.Generic;

namespace coremanage.Data.DomainModel.Identity
{
    public class IdentityClaim: BaseEntity<int>
    {
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }
        public string Description { get; set; }

        public List<IdentityCompanyClaim> IdentityCompanyClaims { get; set; } // many to many
    }
}
