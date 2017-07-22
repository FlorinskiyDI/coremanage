using coremanage.Data.Models.Interfaces;
using storagecore.EntityFrameworkCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Models.Entities
{
    public class UserProfile : BaseEntity<string>, IAuditable
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime LastAccess { get; set; }

        // implementation IAuditable
        public string AddedBy { get; set; }
        public string ModifiedBy { get; set; }
        public string DeletedBy { get; set; }
        public DateTime? AddedTime { get; set; }
        public DateTime? ModifiedTime { get; set; }
        public DateTime? DeletedTime { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual ICollection<UserProfileTenant> UserProfileTenants { get; set; } // many to many
    }
}
