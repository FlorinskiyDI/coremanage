using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Models.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
            : base()
        {
        }

        public ApplicationUser(string userName)
            :base (userName)
        {
            
        }

        public DateTime? AccountExpires { get; set; }
    }
}
