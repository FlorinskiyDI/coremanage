using coremanage.Core.Contracts.Repositories;
using coremanage.Core.Services.Interfaces.Entities;
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

        IAuthRepository _rep;

        public IdentityWithAdditionalClaimsProfileService(IAuthRepository rep)
        {
            this._rep = rep;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {

            //var values = _tenantService.GetAll();

            
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
