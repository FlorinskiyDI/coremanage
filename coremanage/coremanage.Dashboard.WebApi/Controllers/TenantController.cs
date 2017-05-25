using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using coremanage.Core.Models.Dtos.Identity;
using Microsoft.AspNetCore.Mvc;
using coremanage.Core.Services.Interfaces.Entities;
using coremanage.Dashboard.WebApi.Models.Tenant;
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
        [Route("Create")]
        public async Task<IActionResult> GetTenantCreate()
        {
            var tenantCreate = new TenantCreateViewModel();
            var result = await _tenantService.GetTenants();
            tenantCreate.TenantList = result.Select(c => new TenantViewModel {
                Id = c.Id,
                Name = c.Name
            }).ToList();

            return new JsonResult(tenantCreate);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> PostTenantCreate([FromBody] TenantCreateViewModel model)
        {

            var tenantDto = new TenantDto {
                Name = model.Name,
                ParentTenantId = model.ParentId
            };
            var model2 = _tenantService.CreateTenant(tenantDto);

            return new JsonResult(model);
        }


        [HttpGet]
        [Route("Update/{tenantId}")]
        public async Task<IActionResult> GetTenantUpdate(int tenantId)
        {
            var tenantDto = await _tenantService.GetTenant(tenantId);
            var tenants = await _tenantService.GetTenants();
            var tenantUpdate = new TenantUpdateViewModel
            {
                Tenant = tenantDto,
                TenantList = tenants.Select(c => new TenantViewModel {
                    Id = c.Id,
                    Name = c.Name
                }).ToList(),
            };
            
            return new JsonResult(tenantUpdate);
        }

        [HttpPost]
        [Route("Update")]
        public async Task<IActionResult> PostTenantUpdate([FromBody] TenantUpdateViewModel model)
        {
            var tenant = await _tenantService.UpdateTenant(model.Tenant);
            model.Tenant = tenant;

            return new JsonResult(model);
        }


        [HttpGet]
        [Route("TreeNode/{parentId}")]
        public async Task<IActionResult> TreeNodeAsync(int parentId)
        {
            var result = await _tenantService.GetTenantsByParentId(parentId);
            var tenantList = result.Select(c => new TenantViewModel {
                    Id = c.Id,
                    Name = c.Name
                }).ToList();
            return new JsonResult(tenantList);
        }
    }
}
