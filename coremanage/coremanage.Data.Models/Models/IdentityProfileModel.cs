using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Data.Models.Entities;

namespace coremanage.Data.Models.Models
{
    public class IdentityProfileModel
    {
        public string UserId { get; set; }

        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public string Tenant { get; set; }
        public string[] TenantList  { get; set; }
        public string[] TenantClaims { get; set; }

        public string[] Roles { get; set; }

        
    }
}
