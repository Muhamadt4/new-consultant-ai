using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Consultant_Ai_Web_Api.Data.Models;

namespace Consultant_Ai_Web_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDataController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserDataController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ GET: api/userdata (Retrieve all user data)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserData>>> GetAllUserData()
        {
            try
            {
                var userDataList = await _context.UserData.ToListAsync();
                return Ok(userDataList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // ✅ GET: api/userdata/{id} (Retrieve user data by ID)
        [HttpGet("{id}")]
        public async Task<ActionResult<UserData>> GetUserDataById(int id)
        {
            try
            {
                var userData = await _context.UserData.FindAsync(id);
                if (userData == null)
                    return NotFound("User data not found.");

                return Ok(userData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // ✅ POST: api/userdata (Add new user data)
        [HttpPost]
        public async Task<ActionResult<UserData>> CreateUserData([FromBody] UserData userData)
        {
            try
            {
                if (userData == null)
                    return BadRequest("Invalid user data.");

                _context.UserData.Add(userData);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetUserDataById), new { id = userData.UserDataId }, userData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error saving data: {ex.Message}");
            }
        }
    }
}
