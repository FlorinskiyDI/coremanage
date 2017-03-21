using coremanage.Core.Abstraction;
using coremanage.Data.DomainModel.API;
using System;
using System.Collections.Generic;

namespace coremanage.Data.DomainModel.Identity
{
    public class Company: BaseEntity<int>, IAuditable
    {
        public string Name { get; set; }
        public bool IsGroup { get; set; }
        public int? ParentCompanyId { get; set; }

        // implementation IAuditable
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime LastModifiedAt { get; set; }
        public bool IsDeleted { get; set; }

        public List<UserCompany> UserCompanies { get; set; } // many to many
        public List<IdentityCompanyClaim> IdentityCompanyClaims { get; set; } // many to many
        
    }
}
