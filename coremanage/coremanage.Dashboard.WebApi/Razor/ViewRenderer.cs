using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace coremanage.Dashboard.WebApi.Razor
{
    public class ViewRenderer: IViewRenderer
    {
        public ViewRenderer(
            ICompositeViewEngine viewEngine,
            ITempDataProvider tempDataProvider,
            IActionContextAccessor actionAccessor
            )
        {
            this.viewEngine = viewEngine;
            this.tempDataProvider = tempDataProvider;
            this.actionAccessor = actionAccessor;

        }

        private ICompositeViewEngine viewEngine;
        private ITempDataProvider tempDataProvider;
        private IActionContextAccessor actionAccessor;

        public async Task<string> RenderViewAsString<TModel>(string viewName, TModel model)
        {

            var viewData = new ViewDataDictionary<TModel>(
                        metadataProvider: new EmptyModelMetadataProvider(),
                        modelState: new ModelStateDictionary())
            {
                Model = model
            };

            var actionContext = actionAccessor.ActionContext;

            var tempData = new TempDataDictionary(actionContext.HttpContext, tempDataProvider);

            using (var output = new StringWriter())
            {

                ViewEngineResult viewResult = viewEngine.FindView(actionContext, viewName, true);

                ViewContext viewContext = new ViewContext(
                    actionContext,
                    viewResult.View,
                    viewData,
                    tempData,
                    output,
                    new HtmlHelperOptions()
                );

                await viewResult.View.RenderAsync(viewContext);

                return output.GetStringBuilder().ToString();
            }
        }
    }
}
