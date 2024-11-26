using Microsoft.AspNetCore.Mvc;
using ComicSystem.Models;
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
            if (model == null || model.RentalDetails == null || !model.RentalDetails.Any())
                return BadRequest("Invalid rental data.");

            // Kiểm tra nếu khách hàng tồn tại
            var customer = await _context.Customers.FindAsync(model.CustomerID);
            if (customer == null)
                return BadRequest("Customer not found.");

            // Tạo bản ghi thuê sách
            var rental = new Rental
            {
                CustomerID = model.CustomerID,
                RentalDate = DateTime.Now,
                ReturnDate = model.ReturnDate,
                Status = model.Status
            };

            // Thêm bản ghi thuê sách
            _context.Rentals.Add(rental);
            await _context.SaveChangesAsync();

            foreach (var detail in model.RentalDetails)
            {
                var comicBook = await _context.ComicBooks.FindAsync(detail.ComicBookID);
                if (comicBook != null)
                {
                    detail.PricePerDay = comicBook.PricePerDay;
                    detail.RentalID = rental.RentalID;
                    _context.RentalDetails.Add(detail);
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new { rental, model.RentalDetails });
        }
    }
}
