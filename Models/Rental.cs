using System.ComponentModel.DataAnnotations.Schema;

namespace ComicSystem.Models
{
    public class Rental
    {
        public int RentalID { get; set; }

        [ForeignKey("Customer")]
        public int CustomerID { get; set; }
        public Customer Customer { get; set; }

        public DateTime RentalDate { get; set; } = DateTime.Now;
        public DateTime ReturnDate { get; set; }
        public string Status { get; set; }

        public ICollection<RentalDetail> RentalDetails { get; set; }
    }

    public class RentalDetail
    {
        public int RentalDetailID { get; set; }

        [ForeignKey("Rental")]
        public int RentalID { get; set; }

        [ForeignKey("ComicBook")]
        public int ComicBookID { get; set; }

        public int Quantity { get; set; }
        public decimal PricePerDay { get; set; }
    }
}
