using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using coremanage.Dashboard.WebApi.Views;
using IdentityModel.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace coremanage.Dashboard.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Identity")]
    public class IdentityController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]LoginData loginData)
        {
            var url = Startup.Configuration.GetSection("CustomSettings").GetValue<string>("IdentityHost");
            var clientId = Startup.Configuration.GetSection("CustomSettings").GetValue<string>("ClientId");
            var clientSecret = Startup.Configuration.GetSection("CustomSettings").GetValue<string>("ClientSecret");
            var api = Startup.Configuration.GetSection("CustomSettings").GetValue<string>("ApiName");
            try
            {
                // discover endpoints from metadata
                var disco = await DiscoveryClient.GetAsync(url);
                // request token
                var tokenClient = new TokenClient(disco.TokenEndpoint, clientId, clientSecret);
                var tokenResponse = await tokenClient.RequestResourceOwnerPasswordAsync(loginData.UserName, loginData.Password, api);

                return new JsonResult(tokenResponse);
            }
            catch (Exception e)
            {
                return new JsonResult($"{e.Message}\r\n{e.StackTrace}");
            }
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
