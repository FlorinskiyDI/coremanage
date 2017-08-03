using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Core.Models.Dtos.Identity;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using coremanage.Core.Models.Dtos;

namespace coremanage.Core.Services.Interfaces.Entities
{
    public interface IUserProfileService : IBaseService<UserProfileDto, string>
    {
        
        Task<List<string>> GetEmailListForAutoCompleteAsync(string query);
        Task<DataPageDto<UserProfileDto, string>> GetPageData(int pageNumber, int pageLenght, IList<int> tenantIdList);
        Task<UserProfileDto> CreateAsync(string email);
        new string Remove(string userId);

        Task<string> GetPasswordResetTokenAsync(string userId);
        Task<string> GetEmailConfirmationToken(string email);

        Task<UserProfileDto> GetByEmail(string email);
        Task SubscribeFromTenantAsync(string userId, int tenantId);
        Task UnsubscribeFromTenant(string userId, int tenantId);


        Task<IdentityResult> ConfirmEmailAsync(string userId, string token);
        Task<IdentityResult> ResetPasswordAsync(string userId, string code, string password);
    }
}
