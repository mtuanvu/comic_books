using ComicSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            if (model == null || model.Rental == null || model.RentalDetails == null || !model.RentalDetails.Any())
                return BadRequest("Invalid rental data.");

            var rental = model.Rental;
            var rentalDetails = model.RentalDetails;

            rental.RentalDate = DateTime.Now;

            _context.Rentals.Add(rental);
            await _context.SaveChangesAsync();

            foreach (var detail in rentalDetails)
            {
                detail.RentalID = rental.RentalID;
                _context.RentalDetails.Add(detail);
            }

            await _context.SaveChangesAsync();

            return Ok(new { rental, rentalDetails });
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllRentals()
        {
            var rentals = await _context.Rentals
                .Include(r => r.Customer)
                .Include(r => r.RentalDetails)
                .ToListAsync();

            return Ok(rentals);
        }
    }
}
