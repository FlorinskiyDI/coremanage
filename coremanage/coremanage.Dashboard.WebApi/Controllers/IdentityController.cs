using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using coremanage.Dashboard.WebApi.Models;
using Microsoft.Extensions.Configuration;
using coremanage.Core.Services.Interfaces.Entities;
using coremanage.Dashboard.WebApi.Models.Identity;

namespace coremanage.Dashboard.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Identity")]
    public class IdentityController : Controller
    {

        //[HttpPost]
        //[Route("Refresh")]
        //public async Task<IActionResult> Refresh([FromBody] ReLoginData model)
        //{
        //    var extra = new Dictionary<string, string> {
        //        {"tenant_name", model.Tenant}
        //    };

        //    var tokenClient = this.GetTokenClient();
        //    try
        //    {
        //        var refreshTokenResponse = await tokenClient.Result.RequestRefreshTokenAsync(
        //            model.RefreshToken,
        //            extra
        //        );
        //        return new JsonResult(refreshTokenResponse);
        //    }
        //    catch (Exception e)
        //    {
        //        return new JsonResult($"{e.Message}\r\n{e.StackTrace}");
        //    }
        //}
        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody] LoginModel model)
        //{
        //    var extra = new Dictionary<string, string> {
        //        {"tenant_name", model.Tenant}
        //    };

        //    var tokenClient = this.GetTokenClient();
        //    try
        //    {
        //        var tokenResponse = await tokenClient.Result.RequestResourceOwnerPasswordAsync(
        //            model.UserName,
        //            model.Password,
        //            Startup.Configuration.GetSection("CustomSettings").GetValue<string>("ApiName") + " " + StandardScopes.OfflineAccess,
        //            extra: extra
        //        );

        //        return new JsonResult(tokenResponse);
        //    }
        //    catch (Exception e)
        //    {
        //        return new JsonResult($"{e.Message}\r\n{e.StackTrace}");
        //    }
        //}

        //private async Task<TokenClient> GetTokenClient()
        //{
        //    var url = Startup.Configuration.GetSection("CustomSettings").GetValue<string>("IdentityHost");
        //    var clientId = Startup.Configuration.GetSection("CustomSettings").GetValue<string>("ClientId");
        //    var clientSecret = Startup.Configuration.GetSection("CustomSettings").GetValue<string>("ClientSecret");

        //    var disco = await DiscoveryClient.GetAsync(url);
        //    var tokenClient = new TokenClient(disco.TokenEndpoint, clientId, clientSecret);

        //    return tokenClient;
        //}
    }
}
