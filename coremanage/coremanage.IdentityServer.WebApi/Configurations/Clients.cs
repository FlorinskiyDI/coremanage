using IdentityServer4.Models;
using System.Collections.Generic;
using static IdentityServer4.IdentityServerConstants;

namespace coremanage.IdentityServer.WebApi.Configurations
{
    public class Clients
    {
        public static IEnumerable<Client> Get()
        {
            return new List<Client>
            {
                // resource owner password grant client
                new Client
                {
                    ClientId = "ro.client",
                    ClientName = "api1",

                    AllowedGrantTypes =  GrantTypes.ResourceOwnerPassword,

                    AllowOfflineAccess = true,

                    AccessTokenType = AccessTokenType.Jwt, //default already
                    RefreshTokenUsage = TokenUsage.OneTimeOnly,
                    RefreshTokenExpiration = TokenExpiration.Sliding,
                    AbsoluteRefreshTokenLifetime = 86400, // one day
                    SlidingRefreshTokenLifetime = 43200, 
                     
                    ClientSecrets = {
                        new Secret("secret".Sha256())
                    },
                    AllowedScopes = {
                        "api1",
                        StandardScopes.OfflineAccess
                    }
                },
            };
        }
    }
}
