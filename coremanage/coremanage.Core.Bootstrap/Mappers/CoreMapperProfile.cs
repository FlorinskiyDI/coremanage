using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using coremanage.Core.Abstraction.Repositories;
using coremanage.Data.DomainModel.Identity;

namespace coremanage.Core.Bootstrap.Mappers
{
    public class CoreMapperProfile : Profile
    { 
        protected override void Configure()
        {
            //CreateMap<IBaseRepository<Company>, BaseRepository<Company>>();
        }
    }
}
