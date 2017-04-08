using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace coremanage.IdentityServer.WebApi.Models
{
    public static class ExtJwtClaimTypes
    {
        public const string Tenant = "tenant";
        public const string TenantList = "tenant_list";
        public const string TenantClaims = "tenant_claims";
    }
}
