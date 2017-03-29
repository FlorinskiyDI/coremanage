using storagecore.EntityFrameworkCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Models.Entities
{
    public class PersonalClaim : BaseEntity<int>
    {
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }
        public string Description { get; set; }

        public List<PersonalTenantClaim> IdentityTenantClaims { get; set; } // many to many
    }
}
