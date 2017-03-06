using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace coremanage.Data.DomainModel.Identity
{
    public class UserProfile: AuditedEntity, IAuditedEntity
    {
        [Key]
        public string Id { get; set; }
        public List<UserCompany> UserCompanies { get; set; } // many to many

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
    }
}
