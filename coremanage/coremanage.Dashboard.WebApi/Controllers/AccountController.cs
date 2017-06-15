using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using coremanage.Core.Services.Interfaces.Entities;
using coremanage.Dashboard.WebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using coremanage.Data.Models.Entities.Identity;
using IdentityServer4.Services;
using Microsoft.Extensions.Logging;
using coremanage.Dashboard.WebApi.Models.Account;
using coremanage.Dashboard.WebApi.Messaging;
using IdentityServer4.Extensions;
using System.Net;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace coremanage.Dashboard.WebApi.Controllers
{

    [Produces("application/json")]
    [Route("api/Account")]
    //[Authorize]
    public class AccountController : Controller
    {
        private readonly IUserProfileService _userProfileService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ISiteMessageEmailSender _siteMessageEmailSender;

        public AccountController(
            IUserProfileService userProfileService,
            UserManager<ApplicationUser> userManager,
            ISiteMessageEmailSender siteMessageEmailSender
        )
        {
            _userProfileService = userProfileService;
            _userManager = userManager;
            _siteMessageEmailSender = siteMessageEmailSender;
        }

        #region Invitation
        [HttpPost]
        [Route("Invitation")]
        public async Task<IActionResult> InvitationMultiple([FromBody] List<string> emailList)
        {
            foreach (var email in emailList)
            {
                if (!email.IsNullOrEmpty())
                    await BuildInvitationAsync(email);
            }
            return new JsonResult(emailList);
        }

        private async Task BuildInvitationAsync(string email)
        {
            // create applicationUser
            var user = new ApplicationUser { UserName = email, Email = email };
            var result = await _userManager.CreateAsync(user);
            var userProfileDto = await _userProfileService.CreateAsync(user.Id);
            var confirmationToken = await _userProfileService.GetEmailConfirmationToken(email);
            var confirmationUrl = "http://localhost:5300/confirm-email"
                + "?userid=" + userProfileDto.Id
                + "&token=" + this.Encoded(confirmationToken);

            await _siteMessageEmailSender.SendAccountConfirmationEmailAsync(null, email, "Confirm your account", confirmationUrl);
        }
        #endregion

        #region Register

        [HttpPost]
        [Route("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    await _userProfileService.CreateAsync(user.Id);
                    return new JsonResult("Success");
                }
            }
            throw new ArgumentException("Error");
        }

        [HttpPost]
        [Route("Register/Confirm")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterWithConfirmEmail(RegisterViewModel model, string userid, string token)
        {
            var tokenDecoded = this.Decoded(token);
            var resultConfirm = await _userProfileService.ConfirmEmailAsync(userid, tokenDecoded);
            if (!ModelState.IsValid && resultConfirm.Succeeded)
            { 
                // updating applicationUser
                var user = await _userManager.FindByIdAsync(userid);
                var result = await _userManager.AddPasswordAsync(user, model.Password);
                if (result.Succeeded)
                {
                    return new JsonResult("Success");
                }
            }
            throw new ArgumentException("Error");
        }


        #endregion
        //[HttpGet]
        //[Route("ConfirmEmail")]
        //[AllowAnonymous]
        //public async Task<IActionResult> ConfirmEmail(string userid, string token)
        //{
        //    var tokenDecoded = this.Decoded(token);
        //    var result = await _userProfileService.ConfirmEmailAsync(userid, tokenDecoded);
        //    if (result.Succeeded)
        //    {
        //        var passwordResetToken = await _userProfileService.GetPasswordResetTokenAsync(userid);
        //        return new JsonResult(passwordResetToken);
        //    }
        //    throw new ArgumentException("Error");
        //}



        [HttpPost]
        [Route("ResetPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = await _userManager.FindByNameAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return new JsonResult("Success");
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                return new JsonResult("Success");
            }
            AddErrors(result);
            return Ok();
        }

        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private string Encoded(string code)
        {
            var tokenGeneratedBytes = Encoding.UTF8.GetBytes(code);
            return WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
        }

        private string Decoded(string code)
        {
            var codeDecodedBytes = WebEncoders.Base64UrlDecode(code);
            return Encoding.UTF8.GetString(codeDecodedBytes);
        }

        #endregion
    }
}
