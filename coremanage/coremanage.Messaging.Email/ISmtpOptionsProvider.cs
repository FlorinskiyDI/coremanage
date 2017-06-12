using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace coremanage.Messaging.Email
{
    public interface ISmtpOptionsProvider
    {
        Task<SmtpOptions> GetSmtpOptions();
    }
}
