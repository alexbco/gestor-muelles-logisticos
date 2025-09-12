using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static API_Proyecto.Dtos.UsuariosPerfilesDTO;

namespace API_Proyecto.Dtos
{
    public class UsuarioRegistrado
    {
        [Key]
        public int ID { get; set; }
        public string Usuario { get; set; }
        public string Email { get; set; }
        public int PerfilID { get; set; }
        public string PerfilNombre { get; set; }

    }
}
