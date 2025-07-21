using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Proyecto.Models
{
    public class Pedido
    {
        public int ID { get; set; }
        public string Mercancia { get; set; }
        public int Palets { get; set; }
    }

}
