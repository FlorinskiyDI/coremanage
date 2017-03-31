using coremanage.Core.Contracts.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Data.Models.Models;
using System.Threading.Tasks;

namespace coremanage.Data.Storage.Repositories
{
    public class SecurityRepository : ISecurityRepository
    {
        public Task<ProfileModel> UserProfileGet(string userName, int companyId)
        {
            throw new NotImplementedException();
        }

        public Task UserProfileGetRolesClaims(ProfileModel model)
        {
            throw new NotImplementedException();
        }
    }
}
