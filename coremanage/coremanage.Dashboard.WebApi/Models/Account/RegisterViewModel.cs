﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace coremanage.Dashboard.WebApi.Models.Account
{
    public class RegisterViewModel
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ConfirmedPassword { get; set; }
        public string RedirectUrl { get; set; }
    }
}