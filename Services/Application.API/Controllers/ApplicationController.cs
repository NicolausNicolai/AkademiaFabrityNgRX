using Application.API.Dtos;
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
            var aplications = await _context.Applications.ToListAsync();
            var applicationsDto = _mapper.Map<IEnumerable<ApplicationDto>>(aplications);

            return applicationsDto;
        }

        [HttpGet("get-application")]
        public async Task<ApplicationDto> GetApplications(int id)
        {
            var application = await _context.Applications.Where(a => a.Id == id).SingleOrDefaultAsync();
            var applicationDto = _mapper.Map<ApplicationDto>(application);

            return applicationDto;
        }

        [HttpPost("add-new-application")]
        public async Task<ApplicationDto> AddNewApplication(ApplicationDto applicationDto)
        {
            var now = DateTime.Now;

            applicationDto.CreatedDate = now;
            applicationDto.ApplicationStatus = Domain.ApplicationStatus.Submitted;
            applicationDto.Number = $"WN/{now.Year}/{now.Month}/{now.Day}/{now.Ticks}";

            var application = _mapper.Map<Domain.Application>(applicationDto);

            _context.Add(application);
            await _context.SaveChangesAsync();

            return _mapper.Map<ApplicationDto>(application);
        }
    }
}
