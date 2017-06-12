using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Models
{
    public class InvitationDto
    {
        public string Id { get; set; }
        public int TenantId { get; set; }
        public string Token { get; set; }
    }
}
