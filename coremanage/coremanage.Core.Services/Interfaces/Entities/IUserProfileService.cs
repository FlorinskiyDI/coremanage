using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Core.Models.Dtos.Identity;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace coremanage.Core.Services.Interfaces.Entities
{
    public interface IUserProfileService : IBaseService<UserProfileDto, string>
    {
        Task<List<string>> GetEmailListForAutoCompleteAsync(string query);

        Task<UserProfileDto> AddAsync(string email);
        Task<string> GetEmailConfirmationToken(string email);

        Task<IdentityResult> ConfirmEmailAsync(string userId, string token);
    }
}
