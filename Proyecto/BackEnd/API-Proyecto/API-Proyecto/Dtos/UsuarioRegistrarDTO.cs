using static API_Proyecto.Dtos.UsuariosPerfilesDTO;

namespace API_Proyecto.Dtos
{
    public class UsuarioRegistrarDTO
    {
        public string Email { get; set; }
        public string Usuario { get; set; }
        public string Password { get; set; }
        public int PerfilID { get; set; }
    }
}
