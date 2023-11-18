using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrestamoDetalleController : ControllerBase
    {
        [HttpGet("api/prestamoDetalle/all")]
        public List<PrestamoDetalle> Get_all() 
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.prestamo_detalles.ToList();
            }
        }
        [HttpGet("api/prestamoDetalle/get_by_id")]
        public PrestamoDetalle Get_by_id(long id_prestamo_detalle)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.prestamo_detalles.Where(r => r.id_prestamo_detalle == id_prestamo_detalle).FirstOrDefault();
            }
        }
        [HttpDelete]
        public ActionResult Delete(long id_prestamo_detalle){
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.prestamo_detalles.Where(r=>r.id_prestamo_detalle == id_prestamo_detalle).FirstOrDefault();
                    if (query == null) return NotFound();
                    context.prestamo_detalles.Remove(query);
                    return Ok();
                }    
            }
            catch (System.Exception e)
            {
                return BadRequest();
            }
            
        }
        [HttpPost]
        public ActionResult Add([FromBody] PrestamoDetalleViewModel prestamo_detalle){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.prestamo_detalles.Where(r=>r.id_prestamo_detalle == prestamo_detalle.id_prestamo_detalle).FirstOrDefault();
                if (query != null) return BadRequest();
                PrestamoDetalle new_prestamo_detalle = new PrestamoDetalle();
                new_prestamo_detalle.id_inventario = prestamo_detalle.id_inventario;
                new_prestamo_detalle.id_prestamo = prestamo_detalle.id_prestamo;
                context.prestamo_detalles.Add(new_prestamo_detalle);
                context.SaveChanges();
                return Ok();
            }
        }
        [HttpPut]
        public ActionResult Update([FromBody] PrestamoDetalleViewModel prestamo_detalle){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.prestamo_detalles.Where(r=>r.id_prestamo_detalle == prestamo_detalle.id_prestamo_detalle).FirstOrDefault();
                if (query == null) return NotFound();
                query.id_prestamo = prestamo_detalle.id_prestamo;
                query.id_inventario = prestamo_detalle.id_inventario; 
                context.SaveChanges();
                return Ok();
            }
        }
    }
}
