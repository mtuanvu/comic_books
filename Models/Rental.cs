namespace ComicSystem.Models
{
    public class Rental
    {
        public int RentalID { get; set; }
        public int CustomerID { get; set; }
        public DateTime RentalDate { get; set; } = DateTime.Now;
        public DateTime ReturnDate { get; set; }
        public string Status { get; set; }
    }

    public class RentalDetail
    {
        public int RentalDetailID { get; set; }
        public int RentalID { get; set; }
        public int ComicBookID { get; set; }
        public int Quantity { get; set; }
        public decimal PricePerDay { get; set; }
    }

}