using ComicSystem.Data;
using ComicSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ComicSystem.Controllers
{
    [Route("api/comicBooks")]
    [ApiController]
    public class ComicBooksController : ControllerBase
    {
        private readonly ComicSystemContext _context;

        public ComicBooksController(ComicSystemContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.ComicBooks.ToListAsync());
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody] ComicBook comicBook)
        {
            _context.ComicBooks.Add(comicBook);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = comicBook.ComicBookID }, comicBook);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ComicBook comicBook)
        {
            var existingComic = await _context.ComicBooks.FindAsync(id);
            if (existingComic == null) return NotFound();

            existingComic.Title = comicBook.Title;
            existingComic.Author = comicBook.Author;
            existingComic.PricePerDay = comicBook.PricePerDay;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var comicBook = await _context.ComicBooks.FindAsync(id);
            if (comicBook == null) return NotFound();

            _context.ComicBooks.Remove(comicBook);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

}