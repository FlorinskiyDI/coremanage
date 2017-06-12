using coremanage.Messaging.Email;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace coremanage.Dashboard.WebApi.Messaging
{
    public class SiteSmtpOptionsResolver : ISmtpOptionsProvider
    {
        //private SiteContext currentSite;
        private SmtpOptions globalSmtp;

        public SiteSmtpOptionsResolver(
            //SiteContext currentSite,
            IOptions<SmtpOptions> smtpOptionsAccessor
            )
        {
            //this.currentSite = currentSite;
            globalSmtp = smtpOptionsAccessor.Value;
        }

       

        public Task<SmtpOptions> GetSmtpOptions()
        {
            //if (!currentSite.SmtpIsConfigured()) { return Task.FromResult(globalSmtp); }

            SmtpOptions smtpOptions = new SmtpOptions();
            //smtpOptions.Password = currentSite.SmtpPassword;
            //smtpOptions.Port = currentSite.SmtpPort;
            //smtpOptions.PreferredEncoding = currentSite.SmtpPreferredEncoding;
            //smtpOptions.RequiresAuthentication = currentSite.SmtpRequiresAuth;
            //smtpOptions.Server = currentSite.SmtpServer;
            //smtpOptions.User = currentSite.SmtpUser;
            //smtpOptions.UseSsl = currentSite.SmtpUseSsl;
            //smtpOptions.DefaultEmailFromAddress = currentSite.DefaultEmailFromAddress;
            //smtpOptions.DefaultEmailFromAlias = currentSite.DefaultEmailFromAlias;

            return Task.FromResult(smtpOptions);
        }
    }
}
