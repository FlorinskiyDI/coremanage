using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Common.Context
{
    public class NTContextModel
    {
        public string UserId { get; set; }
        public string UserName { get; set; } // key by name
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => this.FirstName + " " + this.LastName;

        public int TenantId { get; set; }
        public string TenantName { get; set; }
        public int? GroupCompanyId { get; set; }
        public int? DashboardPageId { get; set; }
    }
}
