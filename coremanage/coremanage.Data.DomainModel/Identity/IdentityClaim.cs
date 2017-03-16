using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using coremanage.Core.Abstraction;

namespace coremanage.Data.DomainModel.Identity
{
    public class IdentityClaim: IBaseEntity<int>
    {
        [Key]
        public int Id { get; set; }

        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }
        public string Description { get; set; }

        public List<IdentityCompanyClaim> IdentityCompanyClaims { get; set; } // many to many
    }
}
