using coremanage.Data.Models.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace coremanage.Core.Contracts.Repositories
{
    public interface IUserAppRepository
    {
        Task<ApplicationUser> AddAsync(string email, string password);
        Task<string> GetEmailConfirmationToken(string email);
    }
}
