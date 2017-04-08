using IdentityServer4.Models;
using IdentityServer4.Services;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using coremanage.Data.Models.Entities;
using coremanage.Data.Models.Entities.Identity;
using IdentityServer4.Extensions;
using storagecore.Abstractions.Uow;
using coremanage.IdentityServer.WebApi.Models;
using IdentityModel;
using Microsoft.AspNetCore.Identity;

//using coremanage.Core.Contracts.Repositories;


namespace coremanage.IdentityServer.WebApi.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUowProvider _uowProvider;
        private readonly UserManager<ApplicationUser> _userManager;
        public ProfileService(IUowProvider uowProvider, UserManager<ApplicationUser> userManager)
        {
            this._uowProvider = uowProvider;
            this._userManager = userManager;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var user = new UserProfile();
            var sub = context.Subject.GetSubjectId();
            var identityUser = _userManager.FindByNameAsync(sub).Result;

            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var userRepository = uow.GetRepository<UserProfile, string>();
                user = await userRepository.GetAsync(identityUser.Id);
            }

            var jwtClaims = new List<Claim>
            {
                new Claim(JwtClaimTypes.Name, user.FirstName),
                new Claim(JwtClaimTypes.MiddleName, user.FirstName),
                new Claim(JwtClaimTypes.FamilyName, user.LastName),
                new Claim(JwtClaimTypes.Email, user.EmailAddress),
                new Claim(ExtJwtClaimTypes.Tenant, context.Subject.FindFirst(item => item.Type == "tenant").Value)
            };


            

            // Add "tenant_list" claims
            var tenants = user.UserTenants.Select(val => val.Tenant.Name).ToArray();
            
            foreach (var tenant in tenants)
            {
                jwtClaims.Add(new Claim(ExtJwtClaimTypes.TenantList, tenant));
            }

            // Add "tenant_claims" claims
            // Add JwtClaimTypes claims
            

            context.IssuedClaims = jwtClaims;
        }


        public async Task IsActiveAsync(IsActiveContext context)
        {
            context.IsActive = true;
        }
    }
}
