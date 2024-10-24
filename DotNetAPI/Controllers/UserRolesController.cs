
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DotNetAPI.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class UserRolesController : ControllerBase
    {
        private readonly GraphServiceClient _graphClient;

        public UserRolesController(GraphServiceClient graphClient)
        {
            _graphClient = graphClient;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _graphClient.Users
                .Request()
                .Select(u => new { u.Id, u.DisplayName })
                .GetAsync();

            return Ok(users);
        }

        [HttpPost("users/{userId}/roles/{roleId}")]
        public async Task<IActionResult> AddRoleToUser(string userId, string roleId)
        {
            await _graphClient.DirectoryRoles[roleId].Members.References
                .Request()
                .AddAsync(new DirectoryObject { Id = userId });

            return NoContent();
        }

        [HttpDelete("users/{userId}/roles/{roleId}")]
        public async Task<IActionResult> RemoveRoleFromUser(string userId, string roleId)
        {
            await _graphClient.DirectoryRoles[roleId].Members[userId]
                .Reference
                .Request()
                .DeleteAsync();

            return NoContent();
        }
    }
}
