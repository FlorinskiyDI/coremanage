using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using storagecore.Abstractions.Context;
using storagecore.Abstractions.Repositories;
using storagecore.Abstractions.Uow;
using storagecore.EntityFrameworkCore.Context;
using storagecore.EntityFrameworkCore.Repositories;
using storagecore.EntityFrameworkCore.Uow;

namespace storagecore.EntityFrameworkCore
{
    public static class StorageCoreServiceCollectionExtentions
    {
        public static IServiceCollection AddDataAccess<TEntityContext>(this IServiceCollection services) where TEntityContext : DbContextBase<TEntityContext>
        {
            RegisterDataAccess<TEntityContext>(services);
            return services;
        }

        private static void RegisterDataAccess<TEntityContext>(IServiceCollection services) where TEntityContext : DbContextBase<TEntityContext>
        {
            services.TryAddSingleton<IUowProvider, UowProvider>();
            services.TryAddTransient<IEntityContext, TEntityContext>();
            services.TryAddTransient(typeof(IBaseRepository<,>), typeof(GenericRepository<,>));
            //services.TryAddTransient(typeof(IDataPager<>), typeof(DataPager<>));
        }
    }
}
