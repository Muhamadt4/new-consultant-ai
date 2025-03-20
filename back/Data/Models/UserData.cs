
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Consultant_Ai_Web_Api.Data.Models
{

    public class UserData
    {
        [Key]
        public int UserDataId { get; set; } // Primary Key

        [ForeignKey("User")]
        public int UserId { get; set; } // Foreign Key

        [Required]
        public string BusinessType { get; set; }

        [Required]
        public string Inputs { get; set; } // JSON stored as a string

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

}
