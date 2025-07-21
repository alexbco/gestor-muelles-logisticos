using System.Collections.Generic;
using System.Threading.Tasks;
using API_Proyecto.Dtos;
using API_Proyecto.Models;

namespace API_Proyecto.Services.Interfaces
{
    public interface IUsuariosControllerService
    {
        Task<List<Usuarios>> GetAll();
        List<Usuarios> GetUsuariosConPerfiles();
        Usuarios Login(UsuarioLoginDTO user); 
        Usuarios Registrar(UsuarioRegistrarDTO usuarioDto);
        Usuarios ActualizarUsuario(int id, UsuarioRegistrarDTO usuarioDto);
        Task<bool> DeleteUsuario(int id);
    }
}
