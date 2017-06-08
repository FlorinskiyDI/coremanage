﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using coremanage.Core.Models.Dtos.Identity;
using Microsoft.AspNetCore.Mvc;
using coremanage.Core.Services.Interfaces.Entities;
using coremanage.Dashboard.WebApi.Models.Tenant;
using coremanage.Dashboard.WebApi.Models;
using coremanage.Core.Models.Dtos;
using System.IO;
using MimeKit;
using MailKit.Net.Smtp;
using coremanage.Dashboard.WebApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace coremanage.Dashboard.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Tenant")]
    //[Authorize]
    public class TenantController : Controller
    {
        private readonly ITenantService _tenantService;
        private readonly IViewRenderService _viewRenderService;
        public TenantController(
            ITenantService tenantService,
            IViewRenderService viewRenderService
        )
        {
            _tenantService = tenantService;
            _viewRenderService = viewRenderService;
        }

        [HttpGet]
        [Route("Create")]
        public async Task<IActionResult> GetTenantCreate()
        {
            var tenantCreate = new TenantCreateViewModel();
            var result = await _tenantService.GetTenantList();
            tenantCreate.TenantList = result.Select(c => new TenantViewModel
            {
                Id = c.Id,
                Name = c.Name
            }).ToList();

            return new JsonResult(tenantCreate);
        }
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> PostTenantCreate([FromBody] TenantCreateViewModel model)
        {

            var tenantDto = new TenantDto
            {
                Name = model.Name,
                ParentTenantId = model.ParentId
            };
            var model2 = await _tenantService.CreateTenant(tenantDto);

            return new JsonResult(model);
        }


        [HttpGet]
        [Route("Update/{tenantId}")]
        public async Task<IActionResult> GetTenantUpdate(int tenantId)
        {
            var tenantDto = await _tenantService.GetTenant(tenantId);
            var tenants = await _tenantService.GetTenantList();
            var tenantUpdate = new TenantUpdateViewModel
            {
                Tenant = tenantDto,
                TenantList = tenants.Select(c => new TenantViewModel
                {
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
        public async Task<IActionResult> GetTreeNode(int parentId)
        {
            var result = await _tenantService.GetTenantListByParentId(parentId);
            var tenantList = result.Select(c => new TenantViewModel
            {
                Id = c.Id,
                Name = c.Name
            }).ToList();
            return new JsonResult(tenantList);
        }

        [HttpPost]
        [Route("Member/PageData")]
        public async Task<IActionResult> GetMemberPageDataAsync([FromBody] DataPageDto<TenantMemberViewModel, string> pageData)
        {
            if (pageData == null)
            {
                pageData = new DataPageDto<TenantMemberViewModel, string>
                {
                    PageNumber = 1,
                    PageLength = 12
                };
            }

            System.Threading.Thread.Sleep(1000);
            var pageDataMembers = await _tenantService.GetTenantMemberDataPage(pageData.PageNumber, pageData.PageLength);

            pageData.Items = pageDataMembers.Items.Select(s => new TenantMemberViewModel {
                Id = s.Id,
                FullName = s.LastName + " " + s.FirstName[0] + "." + s.MiddleName[0] + ".",
                Email = s.Email
            }).ToList();

            return new JsonResult(pageData);
        }

        [HttpPost]
        [Route("Member/Create")]
        public async Task<IActionResult> PostMemberCreateAsync([FromBody] List<string> model)
        {
            this.SendEmail();
            return new JsonResult(model);
        }


        private async Task SendEmail()
        {
            var viewModel = new InvitationViewModel()
            {
                UserId = "cdb86aea-e3d6-4fdd-9b7f-55e12b710f78",
                UserName = "iggy",
            };

            // Get the generated Razor view as String
            var result = await _viewRenderService.RenderToStringAsync("InvitationTemplate", viewModel);

            MemoryStream stream = new MemoryStream();
            StreamWriter writer = new StreamWriter(stream);
            writer.Write((String)result);
            writer.Flush();
            stream.Position = 0;

            var message = new MimeMessage(); 
            message.From.Add(new MailboxAddress("Hasan Yousef", "dmytro.florynskyi@gmail.com"));
            message.To.Add(new MailboxAddress("Personal", "oleh.florinsky@gmail.com"));
            message.Subject = "Email Test";
            var bodyBuilder = new BodyBuilder();

            bodyBuilder.HtmlBody = @"<div>HTML email body</Div>";

            bodyBuilder.Attachments.Add("msg.html", stream);

            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587);
                client.AuthenticationMechanisms.Remove("XOAUTH2");  // due to enabling less secure apps access
                Console.WriteLine("Prepairing the Email");
                try
                {
                    client.Authenticate("dmytro.florynskyi@gmail.com", "FlorinskyDmitriy");
                    Console.WriteLine("Auth Completed");
                }
                catch (Exception e)
                {
                    Console.WriteLine("ERROR Auth");
                }
                try
                {
                    client.Send(message);
                    Console.WriteLine("Email had been sent");
                }
                catch (Exception e)
                {
                    Console.WriteLine("ERROR");
                }
                client.Disconnect(true);
            }
        }

    }
}
