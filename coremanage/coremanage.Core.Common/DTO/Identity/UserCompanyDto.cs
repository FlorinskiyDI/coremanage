using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Common.DTO.Identity
{
    public class UserCompanyDto
    {
        public int UserProfileId { get; set; }
        public UserProfileDto UserProfile { get; set; }

        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
    }
}
