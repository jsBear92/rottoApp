namespace rottoApp.Models
{
    public class Todo
    {
        public int todoId { get; set; }
        public string? title { get; set; }
        public string? content { get; set; }
        public bool isCompleted { get; set; }
    }
}