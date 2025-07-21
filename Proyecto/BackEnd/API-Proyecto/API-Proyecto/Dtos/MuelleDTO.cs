using System.ComponentModel.DataAnnotations;

namespace API_Proyecto.Models
{
    public class MuelleDTO
    {
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Disponibilidad { get; set; }
        [Required]
        public int TipoCamionID { get; set; }
    }
}
