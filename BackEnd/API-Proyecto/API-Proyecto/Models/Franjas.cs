using System.ComponentModel.DataAnnotations;

namespace API_Proyecto.Models
{
    public class Franjas
    {
        [Key]
        public int ID{ get; set; }
        [Required]
        public DateTime horaInicio { get; set; }
        [Required]
        public DateTime horaFinal { get; set; }
    }
}
