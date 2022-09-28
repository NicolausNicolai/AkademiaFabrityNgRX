using Application.API.Dtos;
using Application.API.Exceptions;
using Application.API.Infrastructure;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Application.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ApplicationController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("get-applications")]
        public async Task<IEnumerable<ApplicationDto>> GetApplications()
        {
            System.Threading.Thread.Sleep(500);
            var aplications = await _context.Applications.ToListAsync();
            var applicationsDto = _mapper.Map<IEnumerable<ApplicationDto>>(aplications);

            return applicationsDto;
        }

        [HttpGet("get-application")]
        public async Task<ApplicationDto> GetApplications(int id)
        {
            System.Threading.Thread.Sleep(500);
            var application = await _context.Applications.Where(a => a.Id == id).SingleOrDefaultAsync();
            var applicationDto = _mapper.Map<ApplicationDto>(application);

            return applicationDto;
        }

        [HttpPost("save-application")]
        public async Task<ApplicationDto> SaveApplication(ApplicationDto applicationDto)
        {
            System.Threading.Thread.Sleep(500);
            var now = DateTime.Now;
            var application = _mapper.Map<Domain.Application>(applicationDto);

            if (application.Id != 0)
            {
                var previousApplication = _context.Applications.Where(a => a.Id == application.Id).AsNoTracking().Single();
                if (previousApplication.ApplicationStatus != Domain.ApplicationStatus.New)
                    throw new BadApplicationStatusException("You cannot modify applications in the state other than New");
            }
            else
            {
                applicationDto.CreatedDate = now;
                applicationDto.ApplicationStatus = Domain.ApplicationStatus.Submitted;
                applicationDto.Number = $"WN/{now.Year}/{now.Month}/{now.Day}/{now.Ticks}";
            }

            if (application.ApplicationStatus != Domain.ApplicationStatus.New && application.ApplicationStatus != Domain.ApplicationStatus.Submitted)
            {
                throw new BadApplicationStatusException("You cannot save the application in other states than New or Submitted");
            }

            _context.Update(application);
            await _context.SaveChangesAsync();

            return _mapper.Map<ApplicationDto>(application);
        }

        [HttpPost("approve-application")]
        public async Task ApproveApplication(int id)
        {
            var application = _context.Applications.Where(a => a.Id == id).Single();

            if (application.ApplicationStatus != Domain.ApplicationStatus.Submitted)
            {
                throw new BadApplicationStatusException("You cannot approve applications in the state other than Submitted.");
            }
            application.ApplicationStatus = Domain.ApplicationStatus.Approved;
            _context.SaveChanges();
        }

        [HttpPost("reject-application")]
        public async Task RejectApplication(int id)
        {
            var application = _context.Applications.Where(a => a.Id == id).Single();

            if (application.ApplicationStatus != Domain.ApplicationStatus.Submitted)
            {
                throw new BadApplicationStatusException("You cannot reject applications in the state other than Submitted.");
            }
            application.ApplicationStatus = Domain.ApplicationStatus.Rejected;
            _context.SaveChanges();
        }

    }
}
