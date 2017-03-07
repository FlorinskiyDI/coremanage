using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace coremanage.Core.Bootstrap.Mappers
{
    public static class CoreMappers
    {
        internal static IMapper Mapper { get; }

        static CoreMappers()
        {
            Mapper = new MapperConfiguration(cfg => cfg.AddProfile<CoreMapperProfile>())
                .CreateMapper();
        }
    }
}