using System;
using System.Collections.Generic;
using coremanage.Core.Common.DTO.Identity;

namespace coremanage.Core.Models.Dtos.Identity
{
    public class TenantDto : BaseDto<int>
    {
        public string Name { get; set; }
        public bool IsGroup { get; set; }
        public int? ParentTenantId { get; set; }

        // Auditable
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime LastModifiedAt { get; set; }
        public bool IsDeleted { get; set; }

        public List<UserCompanyDto> UserCompanies { get; set; } // many to many
        public List<IdentityCompanyClaimDto> IdentityCompanyClaims { get; set; } // many to many
    }
}
