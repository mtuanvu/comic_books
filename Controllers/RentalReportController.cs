using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ComicSystem.Models;

namespace ComicSystem.Controllers
{
    [Route("api/rentals/report")]
    [ApiController]
    public class RentalReportController : ControllerBase
    {
        private readonly ComicSystemContext _context;

        public RentalReportController(ComicSystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetRentalReport(DateTime startDate, DateTime endDate)
        {
            var rentalReport = await (from rental in _context.Rentals
                                      join rentalDetail in _context.RentalDetails on rental.RentalID equals rentalDetail.RentalID
                                      join comicBook in _context.ComicBooks on rentalDetail.ComicBookID equals comicBook.ComicBookID
                                      join customer in _context.Customers on rental.CustomerID equals customer.CustomerID
                                      where rental.RentalDate >= startDate && rental.RentalDate <= endDate
                                      select new RentalReport
                                      {
                                          BookName = comicBook.Title,
                                          RentalDate = rental.RentalDate,
                                          ReturnDate = rental.ReturnDate,
                                          CustomerName = customer.FullName,
                                          Quantity = rentalDetail.Quantity
                                      }).ToListAsync();

            if (rentalReport == null || !rentalReport.Any())
                return NotFound("No rentals found for the specified date range.");

            return Ok(rentalReport);
        }
    }
}
