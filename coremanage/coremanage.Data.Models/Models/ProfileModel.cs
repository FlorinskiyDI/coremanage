using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Data.Models.Entities;

namespace coremanage.Data.Models.Models
{
    public class ProfileModel
    {
        public string UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string UserName { get; set; }

        public string FullName
        {
            get
            {
                return this.FirstName + " " + this.LastName;
            }
        }

        public int CompanyId { get; set; }

        public string[] AdminRoles { get; set; }

        public List<ClaimModel> Claims { get; set; }

        public List<CompanyModel> Companies { get; set; }
        
    }
}
