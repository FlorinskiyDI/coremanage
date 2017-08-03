using System.Collections.Generic;
using coremanage.Core.Common.Context;
using coremanage.Dashboard.WebApi.Models.UserProfile;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using coremanage.Core.Services.Interfaces.Entities;
using System.Linq;
using coremanage.Core.Models.Dtos.Identity;
using coremanage.Dashboard.WebApi.Models.Tenant;
using coremanage.Core.Models.Dtos;

namespace coremanage.Dashboard.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/UserProfile")]
    [Authorize]
    public class UserProfileController : Controller
    {
        private readonly ITenantService _tenantService;
        private readonly IUserProfileService _userProfileService;
        public UserProfileController(
            IUserProfileService userProfileService,
            ITenantService tenantService)
        {
            _userProfileService = userProfileService;
            _tenantService = tenantService;
        }

        [HttpGet]
        [Route("AutoComplete/{query}")]
        public async Task<IActionResult> GetEmailListForAutoComplete(string query)
        {
            var emails = await _userProfileService.GetEmailListForAutoCompleteAsync(query);
            return new JsonResult(emails);
        }

        [HttpGet]
        [Route("GetCreateData")]
        public async Task<IActionResult> GetTenantCreate()
        {
            var tenantCreate = new UserCreateViewModel();
            var result = await _tenantService.GetTenantList();
            tenantCreate.TenantList = result.Select(c => new TenantViewModel
            {
                Id = c.Id,
                Name = c.Name
            }).ToList();

            return new JsonResult(tenantCreate);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> PostTenantCreate([FromBody] UserCreateViewModel model)
        {
            var result = await _userProfileService.CreateAsync(model.Email);
            await _userProfileService.SubscribeFromTenantAsync(result.Id, model.TenantId);
            
            return new JsonResult(model);
        }

        [HttpPost]
        [Route("PageData")]
        public async Task<IActionResult> GetPageData([FromBody] DataPageDto<UserProfileViewModel, string> pageData)
        {
            if (pageData == null)
            {
                pageData = new DataPageDto<UserProfileViewModel, string>
                {
                    PageNumber = 1,
                    PageLength = 12
                };
            }
            var tenantIdList = new List<int> { NTContext.Context.TenantId };
            var pageDataMembers = await _userProfileService
                .GetPageData(
                    pageData.PageNumber,
                    pageData.PageLength,
                    tenantIdList);

            pageData.PageLength = pageDataMembers.PageLength;
            pageData.PageNumber = pageDataMembers.PageNumber;
            pageData.TotalItemCount = pageDataMembers.TotalItemCount;
            pageData.Items = pageDataMembers.Items.Select(s => new UserProfileViewModel { 
                Id = s.Id,
                UserName = (s.LastName == null || s.FirstName == null || s.MiddleName == null) ? "" : s.LastName + " " + s.FirstName[0] + "." + s.MiddleName[0] + ".",
                Email = s.Email
            });

            return new JsonResult(pageData);
        }
        [HttpGet]
        [Route("Delete/{userId}")]
        public IActionResult Remove(string userId)
        {
            var result = _userProfileService.Remove(userId);
            return new JsonResult(result);
        }
    }
}
