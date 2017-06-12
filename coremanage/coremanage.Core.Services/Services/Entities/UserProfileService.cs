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
using coremanage.Data.Models.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using coremanage.Core.Models;
using coremanage.Core.Common.Context;
using coremanage.Core.Contracts.Repositories;

namespace coremanage.Core.Services.Services.Entities
{

    public class UserProfileService : BaseService<UserProfileDto, UserProfile, string>, IUserProfileService
    {

        protected readonly IDataPager<UserProfile, string> Pager;

        public UserProfileService(
            IUowProvider uowProvider,
            IMapper mapper,
            IDataPager<UserProfile, string> pager
        ) : base(uowProvider, mapper)
        {
            this.Pager = pager;
        }

        public async Task<UserProfileDto> AddAsync(string email, string password = "Password")
        { 
            var ccc = new UserProfileDto();
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                // Create ApplicationUser
                var userAppRepository =  uow.GetCustomRepository<ISecurityRepository>();
                //var userApp =  await userAppRepository.AddAsync(email, password);

                //// Create UserProfile
                //var userProfileRepository = uow.GetRepository<UserProfile, string>();
                //var userProfile = new UserProfile { Id = userApp.Id, Email = email };
                //await userProfileRepository.AddAsync(userProfile);
                //await uow.SaveChangesAsync();

                //return Mapper.Map<UserProfile, UserProfileDto>(userProfile);
                return ccc;
            }
        }

        public async Task<string> GetEmailConfirmationToken(string email)
        {
            using (var uow = UowProvider.CreateUnitOfWork())
            {
                var userAppRepository = uow.GetCustomRepository<IUserAppRepository>();
                return await userAppRepository.GetEmailConfirmationToken(email);
            }
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
