using AutoMapper;
using WebApiAutores.DTOs;
using WebApiAutores.Entidades;

namespace WebApiAutores.Utilidades
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles ()
        {
            CreateMap<AutorCreaciónDTO, Autor>();
            CreateMap<Autor, AutorDTO>();

        }
    }
}
