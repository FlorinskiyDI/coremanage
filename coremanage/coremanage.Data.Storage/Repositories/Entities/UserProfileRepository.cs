using coremanage.Data.Storage.Context;
using Microsoft.Extensions.Logging;
using storagecore.EntityFrameworkCore.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Data.Models.Entities;
using storagecore.EntityFrameworkCore.Models;
using System.Threading.Tasks;
using coremanage.Core.Contracts.Repositories;

namespace coremanage.Data.Storage.Repositories.Entities
{
    public class UserProfileRepository: BaseRepository<CoreManageDbContext, UserProfile, string>, IUserProfileRepository
    {
        public UserProfileRepository(ILogger<LoggerDataAccess> logger)
            : base(logger, null)
        { }

        public async Task<List<UserProfile>> GetListByUserId(string userId)
        {
            var list = new List<UserProfile>();
            return list;
        }
    }
}
