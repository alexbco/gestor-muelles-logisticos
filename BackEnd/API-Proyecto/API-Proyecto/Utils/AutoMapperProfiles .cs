using AutoMapper;
using API_Proyecto.Dtos;
using API_Proyecto.Models;

namespace API_Proyecto.Utils
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UsuarioRegistrarDTO, Usuarios>()
                .ForMember(dest => dest.ID, opt => opt.Ignore()) // Ignorar mapeo de la propiedad ID
                .ForMember(dest => dest.Perfil, opt => opt.Ignore()); // Ignorar mapeo de la propiedad Perfil

            CreateMap<Usuarios, UsuarioRegistrado>()
                .ForMember(dest => dest.PerfilNombre, opt => opt.MapFrom(src => src.Perfil.Nombre)); // Mapear el nombre del perfil

            //CreateMap<Pedido, CitasPedidosDTO>().ReverseMap(); // Mapeo bidireccional entre CitasPedido y CitasPedidosDTO

            CreateMap<Citas, ReservarDTO>().ReverseMap(); // Mapeo bidireccional entre CitasPedido y CitasPedidosDTO
            CreateMap<PedidosDTO, Pedido>();

            CreateMap<MuelleDTO, Muelles>().ReverseMap();


        }
    }
}
