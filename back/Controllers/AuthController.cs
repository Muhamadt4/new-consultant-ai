using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    // User Sign-Up
    [HttpPost("signup")]
    public async Task<IActionResult> SignUp([FromBody] User user)
    {
        if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            return BadRequest(new { message = "Email already exists" });

        user.Password_Hash = user.Password_Hash;
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User registered successfully" });
    }

    // User Sign-In
    [HttpPost("signin")]
    public async Task<IActionResult> SignIn([FromBody] User loginUser)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginUser.Email);
        if (user == null || user.Password_Hash != loginUser.Password_Hash)
            return Unauthorized(new { message = "Invalid credentials" });

        return Ok(new { message = "Login successful", userId = user.User_id });
    }


    }
