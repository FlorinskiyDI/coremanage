using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace coremanage.Data.Models.Entities.Identity
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
