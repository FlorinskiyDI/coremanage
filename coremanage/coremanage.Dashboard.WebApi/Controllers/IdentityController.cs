using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using IdentityModel.Client;
using coremanage.Dashboard.WebApi.Models;
using Microsoft.Extensions.Configuration;
using coremanage.Core.Services.Interfaces.Entities;
using static IdentityServer4.IdentityServerConstants;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace coremanage.Dashboard.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Identity")]
    public class IdentityController : Controller
    {

        //private readonly IUserProfileService _userProfileService;
        //public IdentityController(IUserProfileService userProfileService)
        //{
        //    _userProfileService = userProfileService;
        //}
        //private readonly ITenantService _tenantService;
        //public IdentityController(ITenantService tenantService)
        //{
        //    _tenantService = tenantService;
        //}

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]LoginModel loginData)
        {
            var tenantName = "";

            var url = Startup.Configuration.GetSection("CustomSettings").GetValue<string>("IdentityHost");
            var clientId = Startup.Configuration.GetSection("CustomSettings").GetValue<string>("ClientId");
            var clientSecret = Startup.Configuration.GetSection("CustomSettings").GetValue<string>("ClientSecret");
            //var scope = Startup.Configuration.GetSection("CustomSettings").GetValue<string>("ApiName");
            var scope = Startup.Configuration.GetSection("CustomSettings").GetValue<string>("ApiName") + " " + StandardScopes.OfflineAccess;
            var extra = new Dictionary<string, string> { { "tenantName", tenantName } }; // extra property for tenant value
            
            try
            {
                var disco = await DiscoveryClient.GetAsync(url); // discover endpoints from metadata
                var tokenClient = new TokenClient(disco.TokenEndpoint, clientId, clientSecret);
                var tokenResponse = await tokenClient.RequestResourceOwnerPasswordAsync(loginData.UserName, loginData.Password, scope, extra);
                return new JsonResult(tokenResponse);
            }
            catch (Exception e)
            {
                return new JsonResult($"{e.Message}\r\n{e.StackTrace}");
            }
        }


        // GET api/Identity/Tenant/5
        [HttpGet]
        //[Authorize]
        [Route("Tenant/{id}")]
        public List<int> GetTenant(string id)
        {
            var tenants = new List<int>();
            //tenants = _userProfileService.GetTenants(id);
            return tenants;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            // Get user claims
            var result = from c in User.Claims select new { c.Type, c.Value };
            return new JsonResult(result);
        }
    }
}
