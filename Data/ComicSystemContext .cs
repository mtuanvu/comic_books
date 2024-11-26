using Microsoft.EntityFrameworkCore;

namespace ComicSystem.Models
{
    public class ComicSystemContext : DbContext
    {
        public ComicSystemContext(DbContextOptions<ComicSystemContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<ComicBook> ComicBooks { get; set; }
        public DbSet<Rental> Rentals { get; set; }
        public DbSet<RentalDetail> RentalDetails { get; set; }

   protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Rental>()
        .HasOne(r => r.Customer)
        .WithMany()  
        .HasForeignKey(r => r.CustomerID)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<Rental>()
        .HasMany(r => r.RentalDetails)
        .WithOne() 
        .HasForeignKey(rd => rd.RentalID)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<RentalDetail>()
        .HasOne<ComicBook>()
        .WithMany()
        .HasForeignKey(rd => rd.ComicBookID)  
        .OnDelete(DeleteBehavior.Restrict);
}


    }
}
