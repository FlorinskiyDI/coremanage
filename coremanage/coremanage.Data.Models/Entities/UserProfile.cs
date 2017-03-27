using coremanage.Data.Models.Interfaces;
using storagecore.EntityFrameworkCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Models.Entities
{
    public class UserProfile : BaseEntity<string>, IAuditable, ITenant
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }

        // implementation IAuditable
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime LastModifiedAt { get; set; }
        public bool IsDeleted { get; set; }
        // implementation ITenant
        public int TenantId { get; set; }

        public List<UserTenant> UserTenants { get; set; } // many to many
    }
}
