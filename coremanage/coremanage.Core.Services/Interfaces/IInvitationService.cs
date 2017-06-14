using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Services.Interfaces
{
    public interface IInvitationService
    {
        void Invite(string email);
        void InviteMultiple(List<string> emailList );
    }
}
