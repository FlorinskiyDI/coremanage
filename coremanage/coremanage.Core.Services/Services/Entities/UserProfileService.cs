using coremanage.Core.Services.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using coremanage.Core.Models.Dtos.Identity;
using coremanage.Data.Models.Entities;
using storagecore.EntityFrameworkCore.Paging;
using storagecore.Abstractions.Uow;
using AutoMapper;
using System.Threading.Tasks;

namespace coremanage.Core.Services.Services.Entities
{
    
    public class UserProfileService : BaseService<UserProfileDto, UserProfile, string>, IUserProfileService
    {

        protected readonly IDataPager<UserProfile, string> Pager;

        public UserProfileService(
            IUowProvider uowProvider,
            IMapper mapper,
            IDataPager<UserProfile, string> pager)
            : base(uowProvider, mapper)
        {
            this.Pager = pager;
        }

        public async Task<List<string>> GetEmailListForAutoCompleteAsync(string query)
        {
            
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<UserProfile, string>();
                var userprofiles = await repository.QueryAsync(c => c.Email.Contains(query));
                return userprofiles.Select(s => s.Email).ToList();
            }
        }
    }
}
