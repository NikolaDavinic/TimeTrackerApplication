
using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(40)]
        public string Username { get; set; }

        [Required]
        [MaxLength(20)]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public List<Project>? Projects { get; set; }
    }
}
