using System.Collections.Generic;
using coremanage.Core.Common.Context;
using coremanage.Dashboard.WebApi.Models.UserProfile;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace coremanage.Dashboard.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/UserProfile")]
    [Authorize]
    public class UserProfileController : Controller
    {
        // GET: api/values
        [HttpGet]
        //[Authorize(Roles = "SuperAdmin, Admin, Manager, ")]
        public List<UserProfileViewModel> Get()
        {
            var userProfileList = new List<UserProfileViewModel>();

            string name = NTContext.Context.UserName;
            var http = NTContext.HttpContext;

            return userProfileList;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
