using System;
using System.Collections.Generic;

namespace coremanage.Core.Models.Dtos.Identity
{
    public class UserProfileDto: BaseDto<string>
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime LastAccess { get; set; }

        // implementation IAuditable
        public string CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedAt { get; set; }
        public bool? IsDeleted { get; set; }

        public List<UserProfileTenantDto> UserProfileTenants { get; set; } // many to many
    }
}
