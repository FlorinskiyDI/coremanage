using coremanage.Core.Contracts.Repositories;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Services;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
//using coremanage.Core.Contracts.Repositories;


namespace coremanage.IdentityServer.WebApi.Services
{
    public class IdentityWithAdditionalClaimsProfileService : IProfileService
    {

        private readonly ISecurityRepository _securityRepository;
        IdentityWithAdditionalClaimsProfileService(ISecurityRepository securityRepository)
        {
            _securityRepository = securityRepository;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            //_tenantRepository.Get(1);
            //var cc = await _securityRepository.UserProfileGet("", 1);
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
