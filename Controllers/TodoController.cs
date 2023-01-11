using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public IActionResult GetTodos()
        {
            List<Todo> list = _context.Todo.ToList();
            return StatusCode(StatusCodes.Status200OK, list);
        }
    }
}