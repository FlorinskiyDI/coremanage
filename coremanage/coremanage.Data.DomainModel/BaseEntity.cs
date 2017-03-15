using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Data.DomainModel.API;
using System.ComponentModel.DataAnnotations;

namespace coremanage.Data.DomainModel
{
    public class BaseEntity: IBaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}
