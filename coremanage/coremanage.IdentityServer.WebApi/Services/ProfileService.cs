using IdentityServer4.Models;
using IdentityServer4.Services;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.Extensions;
using storagecore.Abstractions.Uow;
using coremanage.IdentityServer.WebApi.Models;
using IdentityModel;
using coremanage.Data.Models.Models;
using coremanage.Core.Contracts.Repositories;

//using coremanage.Core.Contracts.Repositories;


namespace coremanage.IdentityServer.WebApi.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUowProvider _uowProvider;
        public ProfileService(IUowProvider uowProvider)
        {
            this._uowProvider = uowProvider;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var tenant = context.Subject.FindFirst(item => item.Type == ExtUserClaimTypes.Tenant).Value;

            IdentityProfileModel isentityProfile;
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var securityRepository = uow.GetCustomRepository<ISecurityRepository>();
                isentityProfile = await securityRepository.GetIdentityProfileModel(sub, tenant);
            }
            

            var jwtClaims = new List<Claim>
            {
                new Claim(JwtClaimTypes.Name, isentityProfile.FirstName),
                new Claim(JwtClaimTypes.MiddleName, isentityProfile.FirstName),
                new Claim(JwtClaimTypes.FamilyName, isentityProfile.LastName),
                new Claim(JwtClaimTypes.Email, isentityProfile.Email),
                new Claim(ExtJwtClaimTypes.Tenant, context.Subject.FindFirst(item => item.Type == "tenant").Value)
            };
            foreach (var tenantName in isentityProfile.TenantList)
            {
                jwtClaims.Add(new Claim(ExtJwtClaimTypes.TenantList, tenantName));
            }

            context.IssuedClaims = jwtClaims;
        }


        public async Task IsActiveAsync(IsActiveContext context)
        {
            context.IsActive = true;
        }
    }
}
