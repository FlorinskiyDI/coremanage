using IdentityServer4.Models;
using System.Collections.Generic;
using static IdentityServer4.IdentityServerConstants;

namespace coremanage.IdentityServer.WebApi.Configurations
{
    public class Resources
    {
        // Identity resources
        //public static IEnumerable<IdentityResource> GetIdentityResources()
        //{
        //    return new List<IdentityResource>
        //    {
        //        new IdentityResources.OpenId(),
        //        new IdentityResources.Profile(),
        //    };
        //}

        // Api resources
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api1", "My API")
                {
                    UserClaims =
                    {
                        "role","tenants", "email", "userId"
                    }
                }
            };
        }
    }
}
