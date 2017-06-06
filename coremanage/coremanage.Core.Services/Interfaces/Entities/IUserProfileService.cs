using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Core.Models.Dtos.Identity;
using System.Threading.Tasks;

namespace coremanage.Core.Services.Interfaces.Entities
{
    public interface IUserProfileService : IBaseService<UserProfileDto, string>
    {
        Task<List<string>> GetEmailListForAutoCompleteAsync(string query);
    }
}
