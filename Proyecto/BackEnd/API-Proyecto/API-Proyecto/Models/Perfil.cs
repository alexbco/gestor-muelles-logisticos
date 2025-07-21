using System.ComponentModel.DataAnnotations;

namespace API_Proyecto.Models
{
    public class Perfil
    {
        [Key]
        public int ID { get; set; }
        public string Nombre { get; set; }

    }
}
