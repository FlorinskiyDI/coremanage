using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using coremanage.Core.Common.Context;
using coremanage.Core.Common.DTO.Identity;
using coremanage.Dashboard.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
