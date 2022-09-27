using Application.API.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Application.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            var connString = configuration.GetConnectionString("ApplicationDb");

            services.AddDbContext<AppDbContext>(config =>
            {
                config.UseSqlServer(connString);
            });

            return services;
        }

    }
}
