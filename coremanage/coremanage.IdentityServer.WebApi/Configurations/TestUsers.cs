using IdentityServer4.Test;
using System.Collections.Generic;
using System.Security.Claims;

namespace coremanage.IdentityServer.WebApi.Configurations
{
    public class TestUsers
    {
        public static List<TestUser> Get()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "1",
                    Username = "SuperAdmin",
                    Password = "SuperAdmin",

                    Claims = new List<Claim>
                    {
                        //new Claim( "role", EnumRoles.SuperAdmin.ToString() )
                    }
                }
            };
        }
    }
}
