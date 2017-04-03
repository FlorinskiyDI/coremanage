using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Data.Models.Entities;

namespace coremanage.Core.Contracts.Repositories
{
    public interface IAuthRepository
    {
        ApplicationUser GetUserById(string id);
        ApplicationUser GetUserByUsername(string username);
        bool ValidatePassword(string username, string plainTextPassword);
    }
}
