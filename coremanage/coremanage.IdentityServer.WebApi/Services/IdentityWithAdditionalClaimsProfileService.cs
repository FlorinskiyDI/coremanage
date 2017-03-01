using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Services;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;



namespace coremanage.IdentityServer.WebApi.Services
{
    public class IdentityWithAdditionalClaimsProfileService : IProfileService
    {
        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtClaimTypes.Role, "superAdmin"),
                new Claim(JwtClaimTypes.Role, "Admin")
            };
            context.IssuedClaims = claims;
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            context.IsActive = true;
        }
    }
}
