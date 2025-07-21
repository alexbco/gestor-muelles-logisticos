using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using WebApiAutores.Validaciones;

namespace WebApiAutores.Entidades
{
    public class Libro
    {
        public int Id { get; set; }
        [PrimeraLetraMayuscula]
        [StringLength(maximumLength: 250, ErrorMessage = "No puede sobrepasarse de caracteres")]
        public string Titulo { get; set; }
    }
}

