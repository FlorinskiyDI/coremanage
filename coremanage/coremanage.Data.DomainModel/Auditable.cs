using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.DomainModel
{
    public class Auditable: IAuditable
    {
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime LastModifiedAt { get; set; }
        public bool IsDeleted { get; set; }

        public Auditable()
        {
            
        }
    }
}
