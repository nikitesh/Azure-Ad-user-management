
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Graph;
using Microsoft.Identity.Web;

namespace DotNetAPI.Services
{
    public static class GraphClientService
    {
        public static void AddGraphClient(this IServiceCollection services)
        {
            services.AddMicrosoftGraph(options =>
            {
                options.Scopes = "User.Read Directory.ReadWrite.All RoleManagement.ReadWrite.Directory";
            });
        }
    }
}
