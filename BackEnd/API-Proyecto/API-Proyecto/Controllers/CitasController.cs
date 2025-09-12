using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using API_Proyecto.Models;
using API_Proyecto.Dtos;
using System.Globalization;
using AutoMapper;

namespace API_Proyecto.Controllers
{
    [ApiController]
    [Route("api/citas")]
    public class CitasController : Controller
    {
        private readonly AplicationDbContext context;
        private readonly IMapper _mapper;

        public CitasController(AplicationDbContext context, IMapper mapper) // Inyecta IMapper en el constructor
        {
            this.context = context;
            _mapper = mapper;
        }

        [HttpGet("all")]
        public async Task<List<Citas>> GetAll()
        {
            try
            {
                var citas = await context.Citas
                    .Include(c => c.Franjas)
                    .Include(c => c.Muelles) // Incluye la entidad Muelles en la consulta
                    .ToListAsync();

                if (citas.Count > 0)
                {
                    return citas;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al recuperar citas: {ex.Message}");
            }
        }

        [HttpGet("muelles")]
        public async Task<List<Muelles>> GetMuelles()
        {
            try
            {
                var muellesDisponibles = await context.Muelles
                    .Where(m => m.Disponibilidad == "Activo")
                    .ToListAsync();

                if (muellesDisponibles.Count > 0)
                {
                    return muellesDisponibles;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al recuperar los muelles disponibles: {ex.Message}");
            }
        }

        [HttpGet("muelles_all")]
        public async Task<List<Muelles>> GetMuellesAll()
        {
            try
            {
                var muellesDisponibles = await context.Muelles.ToListAsync();

                if (muellesDisponibles.Count > 0)
                {
                    return muellesDisponibles;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al recuperar los muelles: {ex.Message}");
            }
        }


        [HttpGet("MuellesTipoCamion")]
        public async Task<List<MuellesTipoCamion>> MuellesTipoCamion()
        {
            try
            {
                var tipoMuelles= await context.MuellesTipoCamion
                    .ToListAsync();

                if (tipoMuelles.Count > 0)
                {
                    return tipoMuelles;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al recuperar las descripciones de los muelles: {ex.Message}");
            }
        }


        [HttpGet("franjas")]
        public async Task<List<Franjas>> GetFranjas()
        {
            try
            {
                var franjas = await context.Franjas.ToListAsync();

                if (franjas.Count > 0)
                {
                    return franjas;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al recuperar las franjas disponibles: {ex.Message}");
            }
        }

        [HttpGet("TipoCamion")]
        public async Task<List<TipoCamion>> TipoCamion()
        {
            try
            {
                var TipoCamion = await context.TipoCamion.ToListAsync();

                if (TipoCamion.Count > 0)
                {
                    return TipoCamion;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al recuperar los tipos de vehiculo disponibles: {ex.Message}");
            }
        }

        [HttpGet("CitasPedidos")]
        public async Task<List<CitaPedido>> CitasPedidos()
        {
            try
            {
                var CitaPedidos = await context.CitaPedidos.ToListAsync();

                if (CitaPedidos.Count > 0)
                {
                    return CitaPedidos;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al recuperar los pedidos de citas disponibles: {ex.Message}");
            }
        }

        [HttpGet("Pedidos")]
        public async Task<List<Pedido>> Pedidos()
        {
            try
            {
                var Pedidos = await context.Pedidos.ToListAsync();

                if (Pedidos.Count > 0)
                {
                    return Pedidos;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al recuperar los pedidos: {ex.Message}");
            }
        }

        [HttpPost("ComprobarReserva")]
        public IActionResult ComprobarReserva([FromBody] ComprobarReservadoDTO reserva)
        {
        
            // Buscar la cita en la tabla de citas
            var cita = context.Citas.FirstOrDefault(c => c.MuelleID == reserva.MuelleID && c.FranjaID == reserva.FranjaID && c.Fecha == reserva.Fecha);

            if (cita != null)
            {
                // El muelle en la franja horaria y fecha indicadas tiene una cita
                return Ok(true);
            }

            // El muelle en la franja horaria y fecha indicadas no tiene una cita
            return Ok(false);
        }

        [HttpPost("SubirPedido")]
        public IActionResult SubirPedido([FromBody] PedidosDTO pedidoDTO)
        {
            try
           {
                var pedido = _mapper.Map<Pedido>(pedidoDTO);


                context.Pedidos.Add(pedido);
                context.SaveChanges();

                return Ok(pedido);
            }
            catch (Exception ex)
            {
                // Capturar la excepción interna
                var innerExceptionMessage = ex.InnerException != null ? ex.InnerException.Message : string.Empty;
                return StatusCode(500, $"Error al subir el pedido: {ex.Message}. Detalles: {innerExceptionMessage}");
            }
        }

        [HttpGet("pedidos/{id}")]
        public async Task<ActionResult<Pedido>> GetPedidoById(int id)
        {
            var pedido = await context.Pedidos.FindAsync(id);

            if (pedido == null)
            {
                return NotFound(); // Return 404 Not Found if pedido is not found
            }

            return pedido;
        }

        [HttpPost("Reservar")]
        public IActionResult Reservar([FromBody] ReservarDTO citaDTO)
        {
            try
            {
                var cita = _mapper.Map<Citas>(citaDTO);

                context.Citas.Add(cita);
                context.SaveChanges();

                return Ok(cita);
            }
            catch (Exception ex)
            {
                // Capturar la excepción interna
                var innerExceptionMessage = ex.InnerException != null ? ex.InnerException.Message : string.Empty;
                return StatusCode(500, $"Error al subir el pedido: {ex.Message}. Detalles: {innerExceptionMessage}");
            }
        }

        [HttpPost("AsociarCitaPedidos")]
        public IActionResult AsociarCitaPedidos([FromBody] AsociarCitaPedidosDTO asociarDTO)
        {
            try
            {
                // Obtener la última cita ID
                var ultimaCitaId = context.Citas.OrderByDescending(c => c.ID).FirstOrDefault()?.ID ?? 0;

                // Obtener los últimos X pedidos ID
                var ultimosPedidosIds = context.Pedidos.OrderByDescending(p => p.ID).Take(asociarDTO.CantidadPedidos).Select(p => p.ID).ToList();

                // Crear filas en la tabla citas_pedidos para asociar los pedidos con la última cita
                foreach (var pedidoId in ultimosPedidosIds)
                {
                    var citaPedido = new CitaPedido
                    {
                        CitaID = ultimaCitaId,
                        PedidoID = pedidoId
                    };
                    context.CitaPedidos.Add(citaPedido);
                }

                context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                // Capturar la excepción interna
                var innerExceptionMessage = ex.InnerException != null ? ex.InnerException.Message : string.Empty;
                return StatusCode(500, $"Error al asociar la cita con los pedidos: {ex.Message}. Detalles: {innerExceptionMessage}");
            }
        }

        [HttpDelete("borrar/{id}")]
        public async Task<IActionResult> BorrarMuelle(int id)
        {
            var muelle = await context.Muelles.FindAsync(id);
            if (muelle == null)
            {
                return NotFound("Muelle no encontrado");
            }

            // Obtener las citas relacionadas al muelle
            var citasRelacionadas = await context.Citas.Where(c => c.MuelleID == id).ToListAsync();
            if (citasRelacionadas.Count > 0)
            {
                // Obtener los IDs de las citas relacionadas
                var citaIDs = citasRelacionadas.Select(c => c.ID).ToList();

                // Eliminar los registros en CITAS_PEDIDOS que corresponden a las citas
                var citasPedidosRelacionados = await context.CitaPedidos.Where(cp => citaIDs.Contains(cp.CitaID)).ToListAsync();
                if (citasPedidosRelacionados.Count > 0)
                {
                    context.CitaPedidos.RemoveRange(citasPedidosRelacionados);
                }

                // Eliminar las citas
                context.Citas.RemoveRange(citasRelacionadas);
            }

            context.Muelles.Remove(muelle);
            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("crearMuelle")]
        public async Task<IActionResult> CrearMuelle([FromBody] MuelleDTO muelle)
        {

            try
            {
                var muelleNuevo = _mapper.Map<Muelles>(muelle);

                context.Muelles.Add(muelleNuevo);
                context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                // Capturar la excepción interna
                var innerExceptionMessage = ex.InnerException != null ? ex.InnerException.Message : string.Empty;
                return StatusCode(500, $"Error al asociar la cita con los pedidos: {ex.Message}. Detalles: {innerExceptionMessage}");
            }

        }

        [HttpPost("actualizarMuelle")]
        public async Task<IActionResult> actualizarMuelle([FromBody] Muelles muelle)
        {
            try
            {
                var muelle_actualizar = await context.Muelles.FindAsync(muelle.ID);

                if (muelle_actualizar == null)
                {
                    throw new Exception("Muelle no encontrado");
                }

                muelle_actualizar.Nombre = muelle.Nombre; 
                muelle_actualizar.TipoCamionID = muelle.TipoCamionID;
                muelle_actualizar.Disponibilidad = muelle.Disponibilidad;

                await context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                // Capturar la excepción interna
                var innerExceptionMessage = ex.InnerException != null ? ex.InnerException.Message : string.Empty;
                return StatusCode(500, $"Error al actualizar el muelle: {ex.Message}. Detalles: {innerExceptionMessage}");
            }
        }

        [HttpDelete("borrar_reserva/{id}")]
        public async Task<ActionResult> BorrarReserva(int id)
        {
            // Buscar la cita a eliminar
            var cita = await context.Citas.FindAsync(id);

            if (cita == null)
            {
                return NotFound(); // Devolver 404 Not Found si no se encuentra la cita
            }

            // Eliminar los registros asociados en CITAS_PEDIDOS
            var registrosAsociados = context.CitaPedidos.Where(cp => cp.CitaID == id);
            context.CitaPedidos.RemoveRange(registrosAsociados);

            // Eliminar la cita
            context.Citas.Remove(cita);

            await context.SaveChangesAsync();

            return Ok(); // Devolver una respuesta exitosa
        }


        [HttpDelete("borrar_reserva_por_usuario/{usuario}")]
        public async Task<ActionResult> BorrarReservaPorUsuario(string usuario)
        {
            // Obtener las citas asociadas al usuario
            var citas = await context.Citas
                .Where(c => c.Usuario == usuario) // Assuming there is a relationship between 'Citas' and 'Usuario' entities via 'Muelles' entity
                .ToListAsync();

            if (citas == null || citas.Count == 0)
            {
                return Ok(); // Devolver 404 Not Found si no se encuentran citas asociadas al usuario
            }

            foreach (var cita in citas)
            {
                // Eliminar los registros asociados en CITAS_PEDIDOS para cada cita
                var registrosAsociados = context.CitaPedidos.Where(cp => cp.CitaID == cita.ID);
                context.CitaPedidos.RemoveRange(registrosAsociados);

                // Eliminar la cita
                context.Citas.Remove(cita);
            }

            await context.SaveChangesAsync();

            return Ok(); // Devolver una respuesta exitosa
        }






    }


}
