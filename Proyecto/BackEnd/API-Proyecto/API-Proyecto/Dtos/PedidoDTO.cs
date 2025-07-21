using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Proyecto.Models
{
    public class PedidosDTO
    {
        [Required]
        [StringLength(50)]
        public string Mercancia { get; set; }


        [Required]
        public int Palets { get; set; }
    }
}
