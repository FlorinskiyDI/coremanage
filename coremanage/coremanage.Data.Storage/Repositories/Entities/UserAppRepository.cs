using coremanage.Core.Contracts.Repositories;
using coremanage.Data.Models.Entities.Identity;
using coremanage.Data.Storage.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using storagecore.EntityFrameworkCore.Models;
using storagecore.EntityFrameworkCore.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace coremanage.Data.Storage.Repositories.Entities
{
    public class UserAppRepository : Repository<CoreManageDbContext>, IUserAppRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserAppRepository(
             ILogger<LoggerDataAccess> logger,
             CoreManageDbContext context,
             UserManager<ApplicationUser> userManager
         ) : base(logger, context)
        {
            this._userManager = userManager;
        }

        public async Task<ApplicationUser> AddAsync(string email, string password)
        {
            var user = new ApplicationUser { Email = email, UserName = email };
            await _userManager.CreateAsync(user, password);
            return user;
        }

        public async Task<string> GetEmailConfirmationToken(string email)
        {
            var applicaionUser = await _userManager.FindByEmailAsync(email);
            return await _userManager.GenerateEmailConfirmationTokenAsync(applicaionUser);
        }
    }
}
