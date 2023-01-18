using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using rottoApp.Models;

namespace rottoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetTodos")]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            var todoItem = await _context.rottoApp.ToListAsync();

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        [HttpGet("{id}")]
        [Route("GetTodoItem")]
        public async Task<ActionResult<Todo>> GetTodoItem(int? id)
        {
            var todoItem = await _context.rottoApp.Include(t => t.todoId).FirstOrDefaultAsync(t => t.todoId == id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        [HttpPost]
        [Route("PostTodos")]
        public async Task<ActionResult<Todo>> PostTodos(Todo todo)
        {
            _context.rottoApp.Add(todo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodos), new { id = todo.todoId }, todo);
        }

        [HttpDelete("{id}")]
        [Route("DeleteTodos")]
        public async Task<IActionResult> DeleteTodos(int? id)
        {
            var todoItem = await _context.rottoApp.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.rottoApp.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}