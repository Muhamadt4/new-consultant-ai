using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public int User_id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password_Hash { get; set; }  // Store hashed password

    public DateTime Created_At { get; set; } = DateTime.UtcNow;
}