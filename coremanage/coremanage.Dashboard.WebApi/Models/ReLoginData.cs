using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace coremanage.Dashboard.WebApi.Models
{
    public class ReLoginData
    {
        public string RefreshToken { get; set; }
        public string Tenant { get; set; }
    }
}
