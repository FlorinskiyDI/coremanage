using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace coremanage.Dashboard.WebApi.Messaging
{
    public interface ISiteMessageEmailSender
    {
        Task SendAccountConfirmationEmailAsync(
            //ISiteContext siteSettings,
            object siteSettings,
            string toAddress,
            string subject,
            string confirmationUrl);

        //Task SendSecurityCodeEmailAsync(
        //    ISiteContext siteSettings,
        //    string toAddress,
        //    string subject,
        //    string securityCode);

        Task SendPasswordResetEmailAsync(
            //ISiteContext siteSettings,
            object siteSettings,
            string toAddress,
            string subject,
            string resetUrl);

        //Task AccountPendingApprovalAdminNotification(
        //    ISiteContext siteSettings,
        //    ISiteUser user);

        //Task SendAccountApprovalNotificationAsync(
        //    ISiteContext siteSettings,
        //    string toAddress,
        //    string subject,
        //    string loginUrl);
    }
}
