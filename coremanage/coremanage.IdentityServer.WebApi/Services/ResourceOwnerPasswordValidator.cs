using coremanage.Core.Contracts.Repositories;
using coremanage.Data.Models.Entities.Identity;
using coremanage.IdentityServer.WebApi.Models;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using storagecore.Abstractions.Uow;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace coremanage.IdentityServer.WebApi.Services
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private readonly IUowProvider _uowProvider;
        private readonly UserManager<ApplicationUser> _userManager;

        public ResourceOwnerPasswordValidator(
            UserManager<ApplicationUser> userManager,
            IUowProvider uowProvider
        )
        {
            this._userManager = userManager;
            this._uowProvider = uowProvider;
        }

        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            //context.Request.Client.Claims.Add(new Claim("tenant2","tenant2"));
            var username = context.UserName;
            var password = context.Password;
            var tenant = context.Request.Raw.Get("tenant");

            if (string.IsNullOrWhiteSpace(tenant))
            {
                //_logger.LogError("'tenant' doesn't exist in ResourceOwnerPasswordValidationContext.Request.Raw collection.");
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, "Tenant is required.");
                return;
            }

            if (string.IsNullOrWhiteSpace(username))
            {
                //_logger.LogError("'username' is null or whitespace.");
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, "Username is required.");
                return;
            }

            var user = _userManager.FindByNameAsync(username).Result;
            if (user == null)
            {
                //_logger.LogError($"No user found for company {tenant} and username {username}.");
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, $"No user {username} found for for {tenant}.");
                return;
            }
            var isTenant = false;
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var securityRepository = uow.GetCustomRepository<ISecurityRepository>();
                isTenant = await securityRepository.CheckTenantforUserAsync(username, tenant);
            }
            if (!isTenant)
            {
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, "Invalid tenant.");
                return;
            }

            //_logger.LogInformation("Resource owner password validation succeeded.");
            var isPassword = _userManager.CheckPasswordAsync(user, password).Result;
            context.Result = isPassword && isTenant
                ? new GrantValidationResult(
                    context.UserName,
                    GrantType.ResourceOwnerPassword
                    //new[] { new Claim(ExtUserClaimTypes.Tenant, tenant) }
                  )
                : new GrantValidationResult(TokenRequestErrors.InvalidRequest, "Invalid username or password.");

            return;
        }
    }
}
