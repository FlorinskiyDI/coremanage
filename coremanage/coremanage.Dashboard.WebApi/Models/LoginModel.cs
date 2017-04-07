namespace coremanage.Dashboard.WebApi.Models
{
    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool IsRemember { get; set; }
        public string Tenant { get; set; }
    }
}
