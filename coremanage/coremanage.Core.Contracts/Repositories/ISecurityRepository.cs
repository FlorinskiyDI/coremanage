using coremanage.Data.Models.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace coremanage.Core.Contracts.Repositories
{
    public interface ISecurityRepository
    {
        Task<IdentityProfileModel> GetIdentityProfileModel(string userName, string tenant);
        Task<bool> CheckTenantforUserAsync(string userName, string tenant);
    }
}
