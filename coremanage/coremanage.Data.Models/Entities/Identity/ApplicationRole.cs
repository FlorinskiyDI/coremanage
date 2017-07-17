using Microsoft.AspNetCore.Identity;

namespace coremanage.Data.Models.Entities.Identity
{
    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole() : base()
        {
        }

        public ApplicationRole(string roleName, int roleType, int companyId = 0)
            : base(roleName)
        {
            this.TenantId = companyId;
            this.RoleType = roleType;
        }

        public int TenantId { get; set; }
        public int RoleType { get; set; }
    }
}
