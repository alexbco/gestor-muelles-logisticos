using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Proyecto.Models;
using API_Proyecto.Dtos;
using AutoMapper;
using API_Proyecto.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace API_Proyecto.Controllers
{
    [ApiController]
    [Route("api/usuarios")]

    public class UsuariosController : Controller
    {
        public readonly AplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IUsuariosControllerService controllerService;


        public UsuariosController(AplicationDbContext context, IMapper mapper, IUsuariosControllerService controllerService)
        {
            this.context = context;
            this.mapper = mapper;
            this.controllerService = controllerService;

        }

        [HttpGet("all")]
        public async Task<ActionResult<Usuarios>> GetAll()
        {
            var usuarios = await controllerService.GetAll();
            if (usuarios == null)
            {
                return NoContent();
            }
            else
            {
                return Ok(usuarios);
            }
        }


        [HttpGet("UsuariosPerfiles")]
        public IActionResult GetUsuariosConPerfiles()
        {
            var usuarios = controllerService.GetUsuariosConPerfiles();
            if (usuarios == null)
            {
                return NoContent();
            }
            else
            {
                return Ok(usuarios);
            }
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] UsuarioLoginDTO user)
        {
            var usuario = controllerService.Login(user);
            if (usuario != null)
            {
                usuario = context.Usuarios.Include(u => u.Perfil).FirstOrDefault(u => u.ID == usuario.ID);

                var usuarioRegistrado = new UsuarioRegistrado
                {
                    ID = usuario.ID,
                    Usuario = usuario.Usuario,
                    Email = usuario.Email,
                    PerfilID = usuario.PerfilID,
                    PerfilNombre = usuario.Perfil != null ? usuario.Perfil.Nombre : string.Empty
                };

                return Ok(usuarioRegistrado);
            }
            else
            {
                // La autenticación falló
                return Unauthorized("Este usuario no está logueado");
            }
        }



        [HttpPost("registrar")]
        public async Task<IActionResult> Registrar([FromBody] UsuarioRegistrarDTO usuarioDto)
        {
            var result = controllerService.Registrar(usuarioDto);
            if (result != null)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Error al registrar usuario.");
            }
        }





        [HttpPut("actualizar/{id}")]
        public IActionResult ActualizarUsuario(int id, [FromBody] UsuarioRegistrarDTO usuarioDto)
        {
            var usuarioExistente = controllerService.ActualizarUsuario(id,usuarioDto);

            if (usuarioExistente == null)
            {
            return NotFound("Usuario no encontrado");
            }

            return Ok(usuarioExistente);
        }



        [HttpDelete("borrar/{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuarioDeleted = await controllerService.DeleteUsuario(id);
            if (!usuarioDeleted)
            {
                return NotFound("Usuario no encontrado");
            }

            return Ok();
        }



    }
} 

