using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Proyecto.Models
{
    public class Usuarios
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Usuario { get; set; }

        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        [MaxLength(50)]
        public string Password { get; set; }

        [Required]
        public int PerfilID { get; set; }

        [ForeignKey("PerfilID")]
        public Perfil Perfil { get; set; }

    }
}
