using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace coremanage.Dashboard.WebApi.Razor
{
    public interface IViewRenderer
    {
        Task<string> RenderViewAsString<TModel>(string viewName, TModel model);
    }
}
