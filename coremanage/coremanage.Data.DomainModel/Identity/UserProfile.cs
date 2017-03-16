using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using coremanage.Data.DomainModel.API;
using coremanage.Core.Abstraction;

namespace coremanage.Data.DomainModel.Identity
{
    public class UserProfile: Auditable, IBaseEntity<string>, ITenant
    {
        [Key]
        public string Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        
        public int CompanyId { get; set; } // implement ITenant

        public List<UserCompany> UserCompanies { get; set; } // many to many
    }
}
