using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
//using coremanage.Core.Services.Interfaces.Entities;

namespace coremanage.IdentityServer.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {


        //private readonly ITenantService _tenantService;
        //public ValuesController(ITenantService tenantService)
        //{
        //    _tenantService = tenantService;
        //}


        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            //var values = _tenantService.GetAll();
            //var values2 = _tenantService.Get(1);
            return new string[] { "identityServer4", "identityServer4"};
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
