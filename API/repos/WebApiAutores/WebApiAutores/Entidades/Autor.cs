using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApiAutores.Validaciones;

namespace WebApiAutores.Entidades
{
    public class Autor
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "El campo nombre es requerido")]
        [StringLength(maximumLength:120, ErrorMessage = "No puede sobrepasarse de caracteres")]
        [PrimeraLetraMayuscula]
        public string Nombre { get; set; }
    }
}

