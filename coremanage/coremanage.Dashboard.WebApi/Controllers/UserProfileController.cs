using System.Collections.Generic;
using coremanage.Core.Common.Context;
using coremanage.Dashboard.WebApi.Models.UserProfile;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using coremanage.Core.Services.Interfaces.Entities;

namespace coremanage.Dashboard.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/UserProfile")]
    [Authorize]
    public class UserProfileController : Controller
    {

        private readonly IUserProfileService _userProfileService;
        public UserProfileController(IUserProfileService userProfileService)
        {
            _userProfileService = userProfileService;
        }

        [HttpGet]
        [Route("AutoComplete/{query}")]
        public async Task<IActionResult> GetEmailListForAutoComplete(string query)
        {
            var emails = _userProfileService.GetEmailListForAutoCompleteAsync(query);
            return new JsonResult(emails);
        }
    }
}
