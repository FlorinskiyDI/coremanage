using coremanage.Core.Common.Context;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace coremanage.Dashboard.WebApi.Middleware
{
    public class ContextMiddleWare
    {
        private RequestDelegate next;

        public ContextMiddleWare(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            NTContext.HttpContext = context;
            NTContext.Context = null;
            await this.next(context);
        }
    }
}
