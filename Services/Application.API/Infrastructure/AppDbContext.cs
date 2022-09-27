using Microsoft.EntityFrameworkCore;

namespace Application.API.Infrastructure
{

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base (options)
        {
        }
        public DbSet<Domain.Application> Applications { get; set; }
    }
}
