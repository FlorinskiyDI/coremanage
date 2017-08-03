using coremanage.Core.Models.Dtos;

namespace coremanage.Dashboard.WebApi.Models.UserProfile
{
    public class UserProfileViewModel : BaseDto<string>
    {
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
