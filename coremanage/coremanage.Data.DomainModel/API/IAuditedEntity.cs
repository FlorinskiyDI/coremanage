using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.DomainModel
{
    public interface IAuditedEntity
    {
        string CreatedBy { get; set; }
        DateTime CreatedAt { get; set; }
        string LastModifiedBy { get; set; }
        DateTime LastModifiedAt { get; set; }

        bool IsDeleted { get; set; }
        int CompanyId { get; set; }
    }
}
