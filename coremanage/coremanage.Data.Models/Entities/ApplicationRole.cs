using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace coremanage.Data.Models.Entities
{
    public class ApplicationRole: IdentityRole
    {
        public ApplicationRole(): base()
        { 
        }

        public ApplicationRole(string roleName, int roleType)
            :base(roleName)
        {
            this.RoleType = roleType;
        }
        public int RoleType { get; set; }
    }
}
