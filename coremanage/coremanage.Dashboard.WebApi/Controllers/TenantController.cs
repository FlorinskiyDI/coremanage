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
        [Route("Update")]
        public async Task<IActionResult> GetTenantUpdate()
        {
            var tenantUpdate = new TenantUpdateViewModel();
            tenantUpdate.Name = "GetName";
            tenantUpdate.Description = "GetDescription";
            tenantUpdate.ParentId = 2;
            tenantUpdate.TenantList = new List<TenantViewModel>
            {
                new TenantViewModel { Id = 1, Name = "tenant_update_1"},
                new TenantViewModel { Id = 2, Name = "tenant_update_2"},
                new TenantViewModel { Id = 3, Name = "tenant_update_3"},
                new TenantViewModel { Id = 4, Name = "tenant_update_4"},
                new TenantViewModel { Id = 5, Name = "tenant_update_5"}
            };
            return new JsonResult(tenantUpdate);
        }

        [HttpPost]
        [Route("Update")]
        public async Task<IActionResult> PostTenantUpdate([FromBody] TenantUpdateViewModel model)
        {
            var tenantUpdate= new TenantUpdateViewModel();
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
