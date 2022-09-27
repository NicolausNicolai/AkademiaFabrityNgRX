using Application.API.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Application.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ApplicationController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("get-applications")]
        public async Task<IEnumerable<Domain.Application>> GetApplications()
        {
            return await _context.Applications.ToListAsync();
        }

        [HttpPost("add-new-application")]
        public async Task<Domain.Application> AddNewApplication(Domain.Application application)
        {
            _context.Add(application);
            await _context.SaveChangesAsync();

            return application;
        }
    }
}
