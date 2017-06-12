using coremanage.Dashboard.WebApi.Razor;
using coremanage.Messaging.Email;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using coremanage.Dashboard.WebApi.Services;

namespace coremanage.Dashboard.WebApi.Messaging
{
    public class SiteEmailMessageSender : ISiteMessageEmailSender
    {

        //private IViewRenderer _viewRenderer;
        private IViewRenderService _viewRenderService;
        private ISmtpOptionsProvider smtpOptionsProvider;
        //private SmtpOptions globalSmtpSettings;
        //private IStringLocalizer sr;
        private ILogger log;

        public SiteEmailMessageSender(
            //IViewRenderer viewRenderer,
            IViewRenderService viewRenderService,
            ISmtpOptionsProvider smtpOptionsProvider,
            //IOptions<SmtpOptions> smtpOptionsAccessor,
            //IStringLocalizer<CloudscribeCore> localizer,
            ILogger<SiteEmailMessageSender> logger
            )
        {
            log = logger;
            //sr = localizer;
            //this._viewRenderer = viewRenderer;
            _viewRenderService = viewRenderService;
            this.smtpOptionsProvider = smtpOptionsProvider;
            //globalSmtpSettings = smtpOptionsAccessor.Value;

        }

        

        private async Task<SmtpOptions> GetSmptOptions()
        {
            //return await smtpOptionsProvider.GetSmtpOptions().ConfigureAwait(false);
            //if(!siteSettings.SmtpIsConfigured()) { return globalSmtpSettings; }

            SmtpOptions smtpOptions = new SmtpOptions();
            smtpOptions.Password = "FlorinskyDmitriy";
            smtpOptions.Port = 587;
            //smtpOptions.PreferredEncoding = siteSettings.SmtpPreferredEncoding;
            //smtpOptions.RequiresAuthentication = siteSettings.SmtpRequiresAuth;
            smtpOptions.Server = "smtp.gmail.com";
            smtpOptions.User = "dmytro.florynskyi@gmail.com";
            //smtpOptions.UseSsl = siteSettings.SmtpUseSsl;
            smtpOptions.DefaultEmailFromAddress = "dmytro.florynskyi@gmail.com";
            //smtpOptions.DefaultEmailFromAlias = siteSettings.DefaultEmailFromAlias;

            return smtpOptions;
        }

        public async Task SendAccountConfirmationEmailAsync(
            //ISiteContext siteSettings,
            object siteSettings,
            string toAddress,
            string subject,
            string confirmationUrl
        ) {
            var smtpOptions = await GetSmptOptions().ConfigureAwait(false);
            if (smtpOptions == null)
            {
                //var logMessage = $"failed to send account confirmation email because smtp settings are not populated for site {siteSettings.SiteName}";
                var logMessage = $"failed to send account confirmation email because smtp settings are not populated for site";
                log.LogError(logMessage);
                return;
            }

            var sender = new EmailSender();
            try
            {
                var plainTextMessage = await _viewRenderService.RenderToStringAsync("EmailTemplates/ConfirmAccountTextEmail", confirmationUrl).ConfigureAwait(false);
                var htmlMessage = await _viewRenderService.RenderToStringAsync("EmailTemplates/ConfirmAccountHtmlEmail", confirmationUrl).ConfigureAwait(false);

                await sender.SendEmailAsync(
                    smtpOptions,
                    toAddress,
                    smtpOptions.DefaultEmailFromAddress,
                    subject,
                    plainTextMessage,
                    htmlMessage).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                log.LogError("error sending account confirmation email", ex);
            }

        }

        public async Task SendPasswordResetEmailAsync(
            //ISiteContext siteSettings,
            object siteSettings,
            string toAddress,
            string subject,
            string resetUrl)
        {
            var smtpOptions = await GetSmptOptions().ConfigureAwait(false);

            if (smtpOptions == null)
            {
                //var logMessage = $"failed to send password reset email because smtp settings are not populated for site {siteSettings.SiteName}";
                var logMessage = $"failed to send password reset email because smtp settings are not populated for site";
                log.LogError(logMessage);
                return;
            }

            var sender = new EmailSender();
            // in account controller we are calling this method without await
            // so it doesn't block the UI. Which means it is running on a background thread
            // similar as the old ThreadPool.QueueWorkItem
            // as such we need to handle any error that may happen so it doesn't
            // brind down the thread or the process
            try
            {
                var plainTextMessage
                   = await _viewRenderService.RenderToStringAsync("EmailTemplates/PasswordResetTextEmail", resetUrl);

                var htmlMessage
                    = await _viewRenderService.RenderToStringAsync("EmailTemplates/PasswordResetHtmlEmail", resetUrl);

                await sender.SendEmailAsync(
                    smtpOptions,
                    toAddress,
                    smtpOptions.DefaultEmailFromAddress,
                    subject,
                    plainTextMessage,
                    htmlMessage).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                log.LogError("error sending password reset email", ex);
            }

        }

    }
}
