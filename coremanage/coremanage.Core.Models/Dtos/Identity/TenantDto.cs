using System;
using System.Collections.Generic;

namespace coremanage.Core.Models.Dtos.Identity
{
    public class TenantDto : BaseDto<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsGroup { get; set; }
        public int? ParentTenantId { get; set; }

        // Auditable
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime LastModifiedAt { get; set; }
        public bool IsDeleted { get; set; }

       
        //public List<UserProfileTenantDto> UserProfileTenants { get; set; } // many to many
        //public List<PersonalTenantClaimDto> IdentityTenantClaims { get; set; } // many to many
    }
}
