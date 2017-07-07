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
        Task<UserProfileDto> CreateAsync(string email);

        Task<string> GetPasswordResetTokenAsync(string userId);
        Task<string> GetEmailConfirmationToken(string email);

        Task<UserProfileDto> GetByEmail(string email);
        Task SubscribeFromTenant(string userId, int tenantId);
        Task UnsubscribeFromTenant(string userId, string tenantName);


        Task<IdentityResult> ConfirmEmailAsync(string userId, string token);
        Task<IdentityResult> ResetPasswordAsync(string userId, string code, string password);
    }
}
