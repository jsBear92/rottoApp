using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace rottoApp.Models
{
    public partial class Todo
    {
        [Key]
        [Required]
        public int todoId { get; set; }

        [Column(TypeName ="varchar(40)")]
        public string? title { get; set; }
        [Column(TypeName ="varchar(100)")]
        public string? content { get; set; }
        public DateOnly dueDate { get; set; }
    }
}