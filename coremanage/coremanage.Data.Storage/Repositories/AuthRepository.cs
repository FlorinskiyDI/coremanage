using coremanage.Core.Contracts.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using coremanage.Data.Models.Entities;
using coremanage.Data.Storage.Context;

namespace coremanage.Data.Storage.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private CoreManageDbContext db;

        public AuthRepository(CoreManageDbContext context)
        {
            db = context;
        }

        public ApplicationUser GetUserById(string id)
        {
            var user = db.Users.Where(u => u.Id == id).FirstOrDefault();
            return user;
        }

        public ApplicationUser GetUserByUsername(string username)
        {
            var user = db.Users.Where(u => String.Equals(u.Email, username)).FirstOrDefault();
            return user;
        }

        public bool ValidatePassword(string username, string plainTextPassword)
        {
            var user = db.Users.Where(u => u.UserName == username).FirstOrDefault();
            if (user == null) return false;
            return true;
            if (String.Equals(plainTextPassword, user.PasswordHash)) return true;
            return false;
        }
    }
}
