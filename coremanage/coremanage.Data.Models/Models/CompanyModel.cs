using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Models.Models
{
    public class CompanyModel
    {
        public int CompanyId { get; set; }

        public string Name { get; set; }

        public bool GroupInd { get; set; }

        public int? ParentCompanyId { get; set; }

        public override bool Equals(object obj)
        {
            return this.CompanyId.Equals(((CompanyModel)obj).CompanyId);
        }

        public override int GetHashCode()
        {
            return this.CompanyId.GetHashCode();
        }
    }
}
