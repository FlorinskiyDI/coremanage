using coremanage.Data.Models.Entities.Identity;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace coremanage.IdentityServer.WebApi.Services
{
    public class ResourceOwnerPasswordValidator :  IResourceOwnerPasswordValidator
    {
        //IAuthRepository _rep;
        //private readonly ILogger _logger;
        private readonly UserManager<ApplicationUser> _userManager;
        public ResourceOwnerPasswordValidator(
            //ILogger logger,
            UserManager<ApplicationUser> userManager)
        {
            //this._logger = logger;
            this._userManager = userManager;
        }

        public Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            //_logger.LogInformation("Begin resource owner password validation.");

            var username = context.UserName;
            var password = context.Password;
            var tenant = context.Request.Raw.Get("tenant");

            if (string.IsNullOrWhiteSpace(tenant))
            {
                //_logger.LogError("'tenant' doesn't exist in ResourceOwnerPasswordValidationContext.Request.Raw collection.");
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, "Tenant is required.");
                return Task.FromResult(0);
            }

            if (string.IsNullOrWhiteSpace(username))
            {
                //_logger.LogError("'username' is null or whitespace.");
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, "Username is required.");
                return Task.FromResult(0);
            }

            //var userRepo = _userRepositoryFactory.GetUserRepositoryForCompany(tenant);
            //var user = userRepo.GetUserByUserId(username);
            var user = _userManager.FindByNameAsync(username).Result;

            if (user == null)
            {
                //_logger.LogError($"No user found for company {tenant} and username {username}.");
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, $"No user {username} found for for {tenant}.");
                return Task.FromResult(0);
            }

            //_logger.LogInformation("Resource owner password validation succeeded.");

            bool rez = _userManager.CheckPasswordAsync(user, password).Result;


            var ResourceOwnerPassword = GrantTypes.ResourceOwnerPassword;
            context.Result = rez
                ? new GrantValidationResult(context.UserName, "password")
                : new GrantValidationResult(TokenRequestErrors.InvalidRequest, "Invalid username or password.");

            return Task.FromResult(0);
        }
    }
}
