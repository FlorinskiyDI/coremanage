using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Core.Common.DTO.Identity;

namespace coremanage.Core.Services.Shared.API.Security
{
    public interface IUserProfileService : IBaseService<UserProfileDto, string>
    {
        List<int> GetTenants(string id);
    }
}
