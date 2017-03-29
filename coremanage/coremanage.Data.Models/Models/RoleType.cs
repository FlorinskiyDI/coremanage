using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Models.Models
{
    public enum RoleType
    {
        SuperAdmin = 1,
        GroupAdmin = 2,
        TenantAdmin = 3,
        ModuleAdmin = 4,
        UserDefined = 5
    }
}
