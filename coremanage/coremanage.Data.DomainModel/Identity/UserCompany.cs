using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.DomainModel.Identity
{
    public class UserCompany
    {
        public string UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }

        public int CompanyId { get; set; }
        public Company Company { get; set; }
    }
}
