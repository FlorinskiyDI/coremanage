using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Data.Models.Interfaces
{
    public interface IAuditable
    {
        string AddedBy { get; set; }
        string ModifiedBy { get; set; }
        string DeletedBy { get; set; }
        DateTime? AddedTime { get; set; }
        DateTime? ModifiedTime { get; set; }
        DateTime? DeletedTime { get; set; }

        // Soft Delete
        //bool IsDeleted { get; set; }
    }
}
