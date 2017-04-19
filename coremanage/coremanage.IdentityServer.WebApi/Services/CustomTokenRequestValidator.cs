using System;
using System.Collections.Specialized;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using coremanage.IdentityServer.WebApi.Models;

namespace coremanage.IdentityServer.WebApi.Services
{
    public class CustomTokenRequestValidator : ICustomTokenRequestValidator
    {
        public Task ValidateAsync(CustomTokenRequestValidationContext context)
        {
            var tenant = context.Result.ValidatedRequest.Raw.Get(ExtJwtClaimTypes.Tenant);

            // get tenant claim and remove it
            var сlaimForRemoval = context.Result.ValidatedRequest.Client.Claims.FirstOrDefault(x => x.Type == ExtJwtClaimTypes.Tenant);
            context.Result.ValidatedRequest.Client.Claims.Remove(сlaimForRemoval);
            // add tenant claim to client
            context.Result.ValidatedRequest.Client.Claims.Add(new Claim(ExtJwtClaimTypes.Tenant, tenant));

            return Task.FromResult(0);
        }
    }
}
