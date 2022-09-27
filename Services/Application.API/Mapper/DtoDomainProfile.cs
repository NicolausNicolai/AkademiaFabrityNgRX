using Application.API.Dtos;
using AutoMapper;

namespace Application.API.Mapper
{
    public class DtoDomainProfile : Profile
    {
		public DtoDomainProfile()
		{
			CreateMap<ApplicationDto, Domain.Application>().ReverseMap();
		}
	}
}
