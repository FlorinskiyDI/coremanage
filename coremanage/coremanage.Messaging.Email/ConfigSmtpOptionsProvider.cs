using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace coremanage.Messaging.Email
{
    public class ConfigSmtpOptionsProvider : ISmtpOptionsProvider
    {
        public ConfigSmtpOptionsProvider(IOptions<SmtpOptions> smtpOptionsAccessor)
        {
            smtpSettings = smtpOptionsAccessor.Value;
        }

        private SmtpOptions smtpSettings;

        public Task<SmtpOptions> GetSmtpOptions()
        {
            return Task.FromResult(smtpSettings);
        }
    }
}
