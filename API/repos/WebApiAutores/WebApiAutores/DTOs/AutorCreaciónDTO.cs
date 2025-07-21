using System.ComponentModel.DataAnnotations;
using WebApiAutores.Validaciones;

namespace WebApiAutores.DTOs
{
    public class AutorCreaciónDTO
    {
        [Required(ErrorMessage = "El campo nombre es requerido")]
        [StringLength(maximumLength: 120, ErrorMessage = "No puede sobrepasarse de caracteres")]
        [PrimeraLetraMayuscula]
        public string Nombre { get; set; }
    }
}
