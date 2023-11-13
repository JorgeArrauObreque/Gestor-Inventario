using gestion_inventario.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovimientoTipoController : ControllerBase
    {
        [HttpGet("api/MovimientoTipo/all")]
        public List<MovimientoTipo> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.movimiento_tipos.OrderBy(r=>r.id_movimiento_tipo).ToList();
            }
        }
        [HttpGet("api/MovimientoTipo/get_by_id")]
        public MovimientoTipo Get_by_id_movimiento_tipo(int id_movimiento_tipo)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.movimiento_tipos.Where(r => r.id_movimiento_tipo == id_movimiento_tipo).FirstOrDefault();
            }
        }
        [HttpDelete]
        public ActionResult Delete(int id_movimiento_tipo){
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.movimiento_tipos.Where(r=>r.id_movimiento_tipo == id_movimiento_tipo).FirstOrDefault();
                    if (query == null) return NotFound();
                    context.movimiento_tipos.Remove(query);
                    return Ok();
                }
            }
            catch (System.Exception e )
            {
                
                return BadRequest();
            }
         
        }
        [HttpPost]
        public ActionResult Add([FromBody] MovimientoTipo movimiento_tipo){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.movimiento_tipos.Where(r=>r.id_movimiento_tipo == movimiento_tipo.id_movimiento_tipo).FirstOrDefault();
                if (query != null) return BadRequest();
                MovimientoTipo new_movimiento_tipo = new MovimientoTipo();
                new_movimiento_tipo.id_movimiento_tipo = movimiento_tipo.id_movimiento_tipo;
                new_movimiento_tipo.nombre_movimiento_tipo = movimiento_tipo.nombre_movimiento_tipo;
                new_movimiento_tipo.fecha_creacion = DateTime.Now;
                new_movimiento_tipo.fecha_actualizacion = DateTime.Now;
                context.movimiento_tipos.Add(new_movimiento_tipo);
                context.SaveChanges();
                return Ok();
            }
        }
        [HttpPut]
        public ActionResult Update([FromBody] MovimientoTipo movimiento_tipo){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.movimiento_tipos.Where(r=>r.id_movimiento_tipo == movimiento_tipo.id_movimiento_tipo).FirstOrDefault();
                if (query == null) return NotFound();
                query.id_movimiento_tipo = movimiento_tipo.id_movimiento_tipo;
                query.nombre_movimiento_tipo = movimiento_tipo.nombre_movimiento_tipo;

                query.fecha_actualizacion = DateTime.Now;
                context.SaveChanges();
                return Ok();
            }
        }
    }
}
