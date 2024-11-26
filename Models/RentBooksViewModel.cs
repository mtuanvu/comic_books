namespace ComicSystem.Models
{
    public class RentBooksViewModel
    {
        public int CustomerID { get; set; }
        public DateTime ReturnDate { get; set; }
        public string Status { get; set; }

        public List<RentalDetail> RentalDetails { get; set; }
    }
}
