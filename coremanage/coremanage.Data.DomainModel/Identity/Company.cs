using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using URF.EntityFramework;

namespace coremanage.Data.DomainModel.Identity
{
    public class Company: AuditedEntity, IAuditedEntity
    {
        [Key]
        public new int CompanyId
        {
            get
            {
                return base.CompanyId;
            }
            set
            {
                base.CompanyId = value;
            }
        }
        public List<UserCompany> UserCompanies { get; set; } // many to many
        public List<IdentityCompanyClaim> IdentityCompanyClaims { get; set; } // many to many

        public string CompanyName { get; set; }
        public bool GroupInd { get; set; }
        public int? ParentCompanyId { get; set; }
        
    }
}
