using ComicSystem.Models;
using Microsoft.AspNetCore.Mvc;

namespace ComicSystem.Controllers
{
    [Route("api/rentals")]
    [ApiController]
    public class RentalsController : ControllerBase
    {
        private readonly ComicSystemContext _context;

        public RentalsController(ComicSystemContext context)
        {
            _context = context;
        }

        [HttpPost("rental/books")]
        public async Task<IActionResult> RentBooks([FromBody] RentBooksViewModel model)
        {
            if (model == null || model.RentalDetails == null || !model.RentalDetails.Any())
                return BadRequest("Invalid rental data.");

            // Tạo rental mới
            var rental = new Rental
            {
                CustomerID = model.CustomerID,
                RentalDate = DateTime.Now,
                ReturnDate = model.ReturnDate,
                Status = model.Status
            };

            _context.Rentals.Add(rental);
            await _context.SaveChangesAsync();

            foreach (var detail in model.RentalDetails)
            {
                detail.RentalID = rental.RentalID;
                _context.RentalDetails.Add(detail);
            }

            await _context.SaveChangesAsync();

            return Ok(new { rental, model.RentalDetails });
        }
    }
}
