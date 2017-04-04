using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Models.Models
{
    public class ClaimModelComparer : IEqualityComparer<ClaimModel>
    {
        public bool Equals(ClaimModel x, ClaimModel y)
        {
            return x.ClaimType == y.ClaimType && x.ClaimValue == y.ClaimValue;
        }

        public int GetHashCode(ClaimModel obj)
        {
            return new { obj.ClaimType, obj.ClaimValue }.GetHashCode();
        }
    }
}
