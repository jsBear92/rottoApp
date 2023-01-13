namespace rottoApp.Models
{
    public partial class Todo
    {
        public int todoId { get; set; }
        public string? title { get; set; }
        public string? content { get; set; }
        public DateOnly dueDate { get; set; }
    }
}