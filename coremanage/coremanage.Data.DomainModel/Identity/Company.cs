using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using coremanage.Data.DomainModel.API;
using coremanage.Core.Abstraction;

namespace coremanage.Data.DomainModel.Identity
{
    public class Company: Auditable, IBaseEntity<int>
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        public bool IsGroup { get; set; }
        public int? ParentCompanyId { get; set; }

        public List<UserCompany> UserCompanies { get; set; } // many to many
        public List<IdentityCompanyClaim> IdentityCompanyClaims { get; set; } // many to many

    }
}
