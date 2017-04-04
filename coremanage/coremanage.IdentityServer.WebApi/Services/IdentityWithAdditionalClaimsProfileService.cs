using coremanage.Core.Contracts.Repositories;
using coremanage.Core.Services.Interfaces.Entities;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Services;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.Extensions;
using storagecore.Abstractions.Uow;
using coremanage.Data.Models.Models;

//using coremanage.Core.Contracts.Repositories;


namespace coremanage.IdentityServer.WebApi.Services
{
    public class IdentityWithAdditionalClaimsProfileService : IProfileService
    {
        //private ISecurityRepository _securityRepository;
        //public IdentityWithAdditionalClaimsProfileService(ISecurityRepository securityRepository)
        //{
        //    this._securityRepository = securityRepository;
        //}

        private readonly IUowProvider _uowProvider;
        public IdentityWithAdditionalClaimsProfileService(IUowProvider uowProvider)
        {
            this._uowProvider = uowProvider;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {



            var tenantId = 0; // tenant Id
            var userId = context.Subject.GetSubjectId();
            Task<ProfileModel> profileModel;

            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var _securityRepository = uow.GetCustomRepository<ISecurityRepository>();
                profileModel = _securityRepository.UserProfileGet(userId, tenantId);
            }

            var profile = profileModel.Result;
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
