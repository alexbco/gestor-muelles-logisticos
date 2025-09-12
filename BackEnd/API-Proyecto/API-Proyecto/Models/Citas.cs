using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Proyecto.Models
{
    public class Citas
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        [Required]
        public string Usuario { get; set; }

        [Required]
        public int FranjaID { get; set; } // Property for the relationship with the franja horaria

        [ForeignKey("FranjaID")]
        public Franjas Franjas { get; set; } // Navigation property for the Franjas relationship

        [Required]
        public int MuelleID { get; set; } // Property for the relationship with the muelle

        [ForeignKey("MuelleID")]
        public Muelles Muelles { get; set; } // Navigation property for the Muelles relationship

        [Required]
        public int TipoCamionID { get; set; }
    }
}
