using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventarioController : ControllerBase
    {
        [HttpGet("api/inventario/all")]
        public List<Inventario> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.inventario.ToList();
            }
        }
        [HttpGet("api/inventario/get_by_id")]
        public Inventario Get_by_id(long id_inventario)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.inventario.Where(r=>r.id_inventario == id_inventario).FirstOrDefault();
            }
        }
        [HttpDelete]
        public ActionResult Delete(long id_inventario){
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.inventario.Where(r=>r.id_inventario == id_inventario).FirstOrDefault();
                    if (query == null) return NotFound();
                    context.inventario.Remove(query);
                    return Ok();
                }
            }
            catch (System.Exception e)
            {
                return BadRequest();
            }
         
        }
        public ActionResult Add([FromBody] InventarioViewModel inventario){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.inventario.Where(r=>r.id_inventario == inventario.id_inventario).FirstOrDefault();
                if (query != null) return BadRequest();
                Inventario new_inventario = new Inventario();
                new_inventario.id_inventario = inventario.id_inventario;
                new_inventario.id_inventario_estado = inventario.id_inventario_estado;
                new_inventario.id_bodega = inventario.id_bodega;
                new_inventario.id_producto = inventario.id_producto;
                new_inventario.fecha_creacion = DateTime.Now;
                new_inventario.fecha_actualizacion = DateTime.Now;
                new_inventario.user = inventario.user;
                context.inventario.Add(new_inventario);
                context.SaveChanges();
                return Ok();
            }
        }
        public ActionResult Update([FromBody] InventarioViewModel inventario){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.inventario.Where(r=>r.id_inventario == inventario.id_inventario).FirstOrDefault();
                if (query == null) return NotFound();
                query.id_inventario = inventario.id_inventario;
                query.id_inventario_estado = inventario.id_inventario_estado;
                query.id_bodega = inventario.id_bodega;
                query.user = inventario.user;
                query.id_producto = inventario.id_producto;
                query.fecha_actualizacion = DateTime.Now;
                context.SaveChanges();
                return Ok();
            }
        }
    }
}
