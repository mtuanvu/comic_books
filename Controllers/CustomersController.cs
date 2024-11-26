using ComicSystem.Data;
using ComicSystem.Models;
using Microsoft.AspNetCore.Mvc;

namespace ComicSystem.Controllers
{
    [Route("api/customers")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ComicSystemContext _context;

        public CustomersController(ComicSystemContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Customer customer)
        {
            customer.RegistrationDate = DateTime.Now;
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return Ok(customer);
        }
    }

}