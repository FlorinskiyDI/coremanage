using coremanage.Data.Models.Interfaces;
using storagecore.EntityFrameworkCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Models.Entities
{
    public class Tenant : BaseEntity<int>, IAuditable
    {

        public Tenant()
        {
            this.UserProfileTenants = new List<UserProfileTenant>();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public bool? IsGroup { get; set; }
        public int? ParentTenantId { get; set; }

        // implementation IAuditable
        public string AddedBy { get; set; }
        public string ModifiedBy { get; set; }
        public string DeletedBy { get; set; }
        public DateTime? AddedTime { get; set; }
        public DateTime? ModifiedTime { get; set; }
        public DateTime? DeletedTime { get; set; }
        public bool IsDeleted { get; set; }
        
        public List<UserProfileTenant> UserProfileTenants { get; set; } // many to many
        public List<PersonalTenantClaim> IdentityTenantClaims { get; set; } // many to many

    }
}
