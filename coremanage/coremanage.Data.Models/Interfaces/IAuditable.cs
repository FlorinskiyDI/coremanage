using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Models.Interfaces
{
    public interface IAuditable
    {
        string CreatedBy { get; set; }
        DateTime? CreatedAt { get; set; }
        string LastModifiedBy { get; set; }
        DateTime? LastModifiedAt { get; set; }

        // Soft Delete
        bool? IsDeleted { get; set; }
    }
}
