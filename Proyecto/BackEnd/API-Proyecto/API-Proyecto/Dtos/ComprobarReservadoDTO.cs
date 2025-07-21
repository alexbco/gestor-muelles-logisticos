using System.ComponentModel.DataAnnotations;

namespace API_Proyecto.Dtos
{
    public class ComprobarReservadoDTO
    {
        public int MuelleID { get; set; }
        public int FranjaID { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Fecha { get; set; }
    }
}
