using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace coremanage.Dashboard.WebApi.Middleware
{
    public class ProfileMiddleware
    {
        private RequestDelegate next;

        public ProfileMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(
            //SignInManager<ApplicationUser> signInManager,
            //UserManager<ApplicationUser> userManager,
            HttpContext context
         )
        {
            if (context.User.Identity.IsAuthenticated)
            {
                this.SetNTContext(context);
            }

            // automatically logging in in the dev mode
            //else if (SiteSettings.IsEnvironment(SecurityConstants.DevEnvironment))
            //{
            //    ApplicationUser user = await userManager.FindByNameAsync(SecuritySettings.NootusProfileUserName);
            //    await signInManager.SignInAsync(user, false);
            //}

            await this.next(context);
        }

        public void SetNTContext(HttpContext context)
        {
            var claims = context.User.Claims;
            //string companyId = context.Request.Headers[SecurityConstants.HeaderCompanyId];
            //companyId = companyId ?? claims.Where(c => c.Type == NTClaimTypes.CompanyId).Select(c => c.Value).FirstOrDefault();

            //NTContextModel model = new NTContextModel()
            //{
            //    UserId = claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value,
            //    UserName = context.User.Identity.Name,
            //    FirstName = claims.First(c => c.Type == NTClaimTypes.FirstName).Value,
            //    LastName = claims.First(c => c.Type == NTClaimTypes.LastName).Value,
            //    CompanyId = Convert.ToInt32(companyId ?? "0"),
            //};

            //// setting the Group CompanyId
            //model.GroupCompanyId = PageService.CompanyClaims[model.CompanyId]?.ParentCompanyId ?? model.CompanyId;

            //NTContext.Context = model;
        }
    }
}
