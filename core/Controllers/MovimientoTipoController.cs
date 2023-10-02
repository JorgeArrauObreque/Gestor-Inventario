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
                return context.movimiento_tipos.ToList();
            }
        }
        [HttpGet("api/MovimientoTipo/get_by_id")]
        public MovimientoTipo Get_by_id_movimiento_tipo(long id_movimiento_tipo)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.movimiento_tipos.Where(r => r.id_movimiento_tipo == id_movimiento_tipo).FirstOrDefault();
            }
        }
        [HttpDelete]
        public ActionResult Delete(long id_movimiento_tipo){
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
    }
}
