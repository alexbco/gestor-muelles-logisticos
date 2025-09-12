using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Proyecto.Dtos;
using API_Proyecto.Models;
using API_Proyecto.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API_Proyecto.Services.Controllers
{
    public class UsuariosControllerService : IUsuariosControllerService
    {
        public readonly AplicationDbContext _context;
        private readonly IMapper mapper;

        public UsuariosControllerService(AplicationDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;

        }

        public async Task<List<Usuarios>> GetAll()
        {
            try
            {
                var usuarios = await _context.Usuarios.ToListAsync();

                if (usuarios.Count > 0)
                {
                    return usuarios;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al recuperar usuarios: {ex.Message}");
            }
        }

        public List<Usuarios> GetUsuariosConPerfiles()
        {
            var usuariosConPerfiles = _context.Usuarios.Include(u => u.Perfil).ToList();
            return usuariosConPerfiles;
        }

        public Usuarios Login(UsuarioLoginDTO user)
        {
            var dbUser = _context.Usuarios.FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password);
            return dbUser;
        }

        public Usuarios Registrar(UsuarioRegistrarDTO usuarioDto)
        {
            var perfil = _context.Perfiles.Find(usuarioDto.PerfilID);
            if (perfil == null)
            {
                throw new Exception("Perfil inválido");
            }

            var usuario = mapper.Map<UsuarioRegistrarDTO, Usuarios>(usuarioDto);

            _context.Usuarios.Add(usuario);
            _context.SaveChanges();

            return usuario;
        }

        public Usuarios ActualizarUsuario(int id, UsuarioRegistrarDTO usuarioDto)
        {
            var usuarioExistente = _context.Usuarios.FirstOrDefault(u => u.ID == id);

            if (usuarioExistente == null)
            {
                throw new Exception("Usuario no encontrado");
            }

            // Utilizar AutoMapper para mapear los datos del DTO a la entidad existente
            mapper.Map(usuarioDto, usuarioExistente);

            _context.SaveChanges();

            return usuarioExistente;
        }


        public async Task<bool> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return false;
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return true;
        }

    }
}
