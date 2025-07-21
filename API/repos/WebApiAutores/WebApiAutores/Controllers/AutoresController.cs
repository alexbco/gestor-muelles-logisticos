using Microsoft.AspNetCore.Mvc;
using WebApiAutores.Entidades;
using Microsoft.EntityFrameworkCore;
using WebApiAutores.DTOs;
using AutoMapper;

namespace WebApiAutores.Controllers
{
    [ApiController]
    [Route("api/autores")]
    public class AutoresController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public AutoresController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        //Metodos get
        [HttpGet("/listados")]
        public async Task<ActionResult<List<AutorDTO>>> Get()
        {
            var autores = await context.Autores.ToListAsync();
            return mapper.Map<List<AutorDTO>>(autores);
        }

        [HttpGet("/primero")]
        public async Task<ActionResult<Autor>> PrimerAutor()
        {
            return await context.Autores.FirstOrDefaultAsync();
        }


        [HttpGet("{id:int}/{param2=persona}")]
        public async Task<ActionResult<AutorDTO>> Get(int id, string param2)
        {

            var autor = await context.Autores.FirstOrDefaultAsync(x => x.Id == id && x.Nombre == param2);

            if (autor == null)
            {
                return NotFound();
            }

            return mapper.Map<AutorDTO>(autor);
        }


        [HttpGet("klk/klk/{nombre=ejemplo}")] 
        public async Task<ActionResult<List<AutorDTO>>> Get(string nombre)
        {

            var autores = await context.Autores.Where(autorBD => autorBD.Nombre.Contains(nombre)).ToListAsync();

            return mapper.Map<List<AutorDTO>>(autores);
        }

        //Metodo post
        [HttpPost]
        public async Task<ActionResult> Post(AutorCreaciónDTO AutorCreaciónDTO)
        {
            var existeAutorConElMismoNombre = await context.Autores.AnyAsync(x => x.Nombre == AutorCreaciónDTO.Nombre);

            if(existeAutorConElMismoNombre)
            {
                return BadRequest($"Ya existe un autor con el nombre {AutorCreaciónDTO.Nombre}");
            }

            var autor = mapper.Map<Autor>(AutorCreaciónDTO);

            context.Add(AutorCreaciónDTO);
            await context.SaveChangesAsync();
            return Ok();
        }
        //Metodo put
        [HttpPut("{id:int}")] 
        public async Task<ActionResult> Put(Autor autor, int id)
        {
            if (autor.Id != id)
            {
                return BadRequest("El id del autor no cohincide con el de la url.");
            }
            var existe = await context.Autores.AnyAsync(x => x.Id == id);

            if (!existe)
            {
                return NotFound();              
            }

            context.Update(autor);
            await context.SaveChangesAsync();
            return Ok();
        }

        //Metodo delete
        [HttpDelete("{id:int}")] 
        public async Task<ActionResult> Delete(int id)
        {
            var existe = await context.Autores.AnyAsync(x => x.Id == id);

            if (!existe)
            {
                return NotFound();
            }
            
            context.Remove(new Autor() { Id = id });
            await context.SaveChangesAsync();
            return Ok();

        }


    }
}
