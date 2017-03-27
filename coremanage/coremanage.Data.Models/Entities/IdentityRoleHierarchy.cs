using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Models.Entities
{
    public class IdentityRoleHierarchy
    {
        public string RoleId { get; set; }
        public string ChildRoleId { get; set; }
    }
}
