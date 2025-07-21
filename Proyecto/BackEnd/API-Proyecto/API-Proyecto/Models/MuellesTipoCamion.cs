using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Proyecto.Models
{
    [Table("MUELLES_TIPO_CAMION")]

    public class MuellesTipoCamion
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Descripcion { get; set; }
    }
}
 