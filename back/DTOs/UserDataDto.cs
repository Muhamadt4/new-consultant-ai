namespace Consultant_Ai_Web_Api.DTOs
{
    public class UserDataDto
    {
        public int UserId { get; set; }  // User who submitted the data
        public string BusinessType { get; set; } = string.Empty;
        public object Inputs { get; set; }  // JSON object instead of string
    }
}
