using System;
using System.Collections.Generic;

namespace coremanage.Core.Common.DTO.Identity
{
    public class UserProfileDto: BaseDto<string>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }

        // Auditable
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime LastModifiedAt { get; set; }
        public bool IsDeleted { get; set; }
        // Tenant
        public int CompanyId { get; set; }

        public List<UserCompanyDto> UserCompanies { get; set; } // many to many
    }
}
