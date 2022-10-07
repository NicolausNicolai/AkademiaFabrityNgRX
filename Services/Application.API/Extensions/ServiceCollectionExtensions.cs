using Application.API.Infrastructure;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Polly;

namespace Application.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IHost MigrateDatabase<TContext>(this IHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var configuration = services.GetRequiredService<IConfiguration>();
                var logger = services.GetRequiredService<ILogger<TContext>>();

                try
                {
                    logger.LogInformation("Migrating sql server database.");

                    var retry = Policy.Handle<SqlException>()
                            .WaitAndRetry(
                                retryCount: 5,
                                sleepDurationProvider: retryAttempt => TimeSpan.FromSeconds(5/*Math.Pow(2, retryAttempt)*/), // 2,4,8,16,32 sc
                                onRetry: (exception, retryCount, context) =>
                                {
                                    logger.LogError($"Retry {retryCount} of {context.PolicyKey} at {context.OperationKey}, due to: {exception}.");
                                });

                    //if the postgresql server container is not created on run docker compose this
                    //migration can't fail for network related exception. The retry options for database operations
                    //apply to transient exceptions                    
                    retry.Execute(() => scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.Migrate());

                    logger.LogInformation("Migrated sql server database.");
                }
                catch (SqlException ex)
                {
                    logger.LogError(ex, "An error occurred while migrating the sql server database");
                    throw ex;
                }
            }

            return host;
        }

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
