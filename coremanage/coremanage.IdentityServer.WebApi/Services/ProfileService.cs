using IdentityServer4.Models;
using IdentityServer4.Services;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.Extensions;
using storagecore.Abstractions.Uow;
using coremanage.IdentityServer.WebApi.Models;
using IdentityModel;
using coremanage.Data.Models.Models;
using coremanage.Core.Contracts.Repositories;
using coremanage.Core.Common.Types;
using coremanage.Data.Models.Entities;

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
            // get sub from subject
            var sub = context.Subject.GetSubjectId();
            // get tenant claim from client
            var tenantName = context.Client.Claims.ToList().Find(s => s.Type == ExtJwtClaimTypes.TenantName).Value;

            IdentityProfileModel isentityProfile;
            Tenant tenant;
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var securityRepository = uow.GetCustomRepository<ISecurityRepository>();
                isentityProfile = await securityRepository.GetIdentityProfileModel(sub, tenantName);
                tenant = await securityRepository.GetTenantByName(tenantName);
            }

            var jwtClaims = new List<Claim>
            {
                new Claim(JwtClaimTypes.Id, isentityProfile.UserId),
                new Claim(JwtClaimTypes.Name, isentityProfile.FirstName),
                new Claim(JwtClaimTypes.MiddleName, isentityProfile.FirstName),
                new Claim(JwtClaimTypes.FamilyName, isentityProfile.LastName),
                new Claim(JwtClaimTypes.Email, isentityProfile.Email),
                new Claim(ExtJwtClaimTypes.TenantId, tenant.Id.ToString()),
                new Claim(ExtJwtClaimTypes.TenantName, tenantName)
            };
            
            foreach (var item in isentityProfile.TenantList)
            {
                jwtClaims.Add(new Claim(ExtJwtClaimTypes.TenantList, item));
            }

            context.IssuedClaims = jwtClaims;
        }


        public async Task IsActiveAsync(IsActiveContext context)
        {
            context.IsActive = true;
        }
    }
}
