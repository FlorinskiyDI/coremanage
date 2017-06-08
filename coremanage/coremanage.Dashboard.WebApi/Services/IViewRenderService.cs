using System.Threading.Tasks;

namespace coremanage.Dashboard.WebApi.Services
{
    public interface IViewRenderService
    {
        Task<string> RenderToStringAsync(string viewName, object model);
    }
}
