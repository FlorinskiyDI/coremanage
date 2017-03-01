using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.IdentityServer.Storage.EFCore.Common.Entities
{
    public class AppUser : IdentityUser
    {
        public AppUser()
        {
        }
        public AppUser(string userName)
            : base(userName)
        {
        }
        public DateTime AccountExpires { get; set; }
    }
}
