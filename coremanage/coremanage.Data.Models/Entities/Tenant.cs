using coremanage.Data.Models.Interfaces;
using storagecore.EntityFrameworkCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Models.Entities
{
    public class Tenant : BaseEntity<int>, IAuditable
    {
        public string Name { get; set; }
        public bool? IsGroup { get; set; }
        public int? ParentTenantId { get; set; }

        // implementation IAuditable
        public string CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedAt { get; set; }
        public bool? IsDeleted { get; set; }
        
        public List<UserProfileTenant> UserTenants { get; set; } // many to many
        public List<PersonalTenantClaim> IdentityTenantClaims { get; set; } // many to many

    }
}
