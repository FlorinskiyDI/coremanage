using coremanage.Core.Services.Shared.API.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using coremanage.Core.Common.DTO.Identity;
using coremanage.Data.DomainModel.Identity;
using storagecore.Abstractions.Uow;
using AutoMapper;

namespace coremanage.Core.Services.Shared.Services.Security
{
    public class UserProfileService: BaseService<UserProfileDto, UserProfile, string>,  IUserProfileService
    {

        public UserProfileService(IUowProvider uowProvider, IMapper mapper)
            :base(uowProvider, mapper)
        {

        }

        public List<int> GetTenants(string id)
        {
            UserProfile user;
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<UserProfile, string>();
                user = repository.Get(id);
            }
            var tenants = user.UserCompanies.Select(c => c.CompanyId).ToList();
            return tenants;
        }
    }
}
