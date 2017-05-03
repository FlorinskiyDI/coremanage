﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using coremanage.Core.Services.Interfaces.Entities;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace coremanage.Dashboard.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Tenant")]
    //[Authorize]
    public class TenantController : Controller
    {
        private readonly ITenantService _tenantService;
        public TenantController(ITenantService tenantService)
        {
            _tenantService = tenantService;
        }

        [HttpGet]
        [Route("TreeNode/{tenantName}")]
        public IActionResult TreeNode(string tenantName)
        {

            var random = new Random();

            var ccc = tenantName;
            var fff = new List<object>
            {
                new
                {
                    id = random.Next(0, 1000),
                    label = "Lazy Node 0",
                    data = "Node 0",
                    expandedIcon = "fa-folder-open",
                    collapsedIcon = "fa-folder",
                    leaf = false
                },
                new
                {
                    id = random.Next(0, 1000),
                    label = "Lazy Node 1",
                    data = "Node 1",
                    expandedIcon = "fa-folder-open",
                    collapsedIcon = "fa-folder",
                    leaf = false
                },
                new
                {
                    id = random.Next(0, 1000),
                    label = "Lazy Node 2",
                    data = "Node 2",
                    expandedIcon = "fa-folder-open",
                    collapsedIcon = "fa-folder",
                    leaf = false
                }
            };
            return new JsonResult(fff);
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            var values = _tenantService.GetAll();
            var values2 = _tenantService.Get(1);
            return new string[] { "value1", "value2" };
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
