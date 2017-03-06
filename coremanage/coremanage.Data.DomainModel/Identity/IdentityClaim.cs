using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace coremanage.Data.DomainModel.Identity
{
    public class IdentityClaim
    {
        [Key]
        public int Id { get; set; }
        public List<IdentityCompanyClaim> IdentityCompanyClaims { get; set; } // many to many

        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }
        public string Description { get; set; }
    }
}
