﻿using coremanage.Core.Services.Interfaces.Entities;
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

        protected readonly IDataPager<UserProfile, string> _pager;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserProfileService(
            IUowProvider uowProvider, 
            IMapper mapper,
            IDataPager<UserProfile, string> pager,
            UserManager<ApplicationUser> userManager
        ) : base(uowProvider, mapper)
        {
            this._pager = pager;
            this._userManager = userManager;
        }

        public async Task<UserProfileDto> AddAsync(string email)
        {
            // create ApplicationUser
            var user = new ApplicationUser { UserName = email, Email = email };
            var result = await _userManager.CreateAsync(user);

            if (result.Succeeded)
            {
                // Create UserProfile
                using (var uow = UowProvider.CreateUnitOfWork())
                {
                    var userProfileRepository = uow.GetRepository<UserProfile, string>();
                    var userProfile = new UserProfile { Id = user.Id, Email = user.Email };
                    await userProfileRepository.AddAsync(userProfile);
                    await uow.SaveChangesAsync();

                    return Mapper.Map<UserProfile, UserProfileDto>(userProfile);
                }
            }
            throw new ArgumentException("Can not create user");
        }

        public async Task<IdentityResult> ConfirmEmailAsync(string userId, string token)
        {
            if (userId == null || token == null)
            {
                throw new ArgumentException("Error");
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                throw new ArgumentException("Error");
            }

           var result =  await _userManager.ConfirmEmailAsync(user, token);
           return result;
        }

        public async Task<string> GetEmailConfirmationToken(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var emailConfirmationToken =  await _userManager.GenerateEmailConfirmationTokenAsync(user);
            return emailConfirmationToken;
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
