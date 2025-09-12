using System.ComponentModel.DataAnnotations;

namespace API_Proyecto.Models
{
    public class CitaPedido
    {
        [Key]
        public int ID { get; set; }
        public int CitaID { get; set; }
        public int PedidoID { get; set; }
    }
}
