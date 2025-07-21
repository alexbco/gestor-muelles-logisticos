using System.ComponentModel.DataAnnotations;

namespace API_Proyecto.Dtos
{
    public class TipoCamion
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Descripcion { get; set; }

    }
}
