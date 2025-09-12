using System.ComponentModel.DataAnnotations;

namespace API_Proyecto.Dtos
{
    public class ReservarDTO
    {
        [Required]
        public DateTime Fecha { get; set; }
        [Required]
        public string Usuario { get; set; }

        [Required]
        public int FranjaID { get; set; } // Agrega la propiedad para la relación con la franja horaria

        [Required]
        public int MuelleID { get; set; } // Agrega la propiedad para la relación con el muelle

        [Required]
        public int TipoCamionID { get; set; } 
    }
}
