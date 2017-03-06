using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.DomainModel
{
    public class AuditedEntity: IAuditedEntity
    {
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime LastModifiedAt { get; set; }
        
        public bool IsDeleted { get; set; }
        public int CompanyId { get; set; }

        public AuditedEntity()
        {
            
        }
    }
}
