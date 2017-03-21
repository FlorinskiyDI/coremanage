using System;
using System.Collections.Generic;
using coremanage.Data.DomainModel.API;
using storagecore.EntityFrameworkCore.Entities;

namespace coremanage.Data.DomainModel.Identity
{
    public class UserProfile: BaseEntity<string>, IAuditable, ITenant
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
        public int CompanyId { get; set; }

        public List<UserCompany> UserCompanies { get; set; } // many to many
    }
}
