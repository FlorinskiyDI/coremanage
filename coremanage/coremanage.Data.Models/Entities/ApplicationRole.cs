using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace coremanage.Data.Models.Entities
{
    public class ApplicationRole: IdentityRole
    {
        public int CompanyId { get; set; }
        public int RoleType { get; set; }
    }
}
