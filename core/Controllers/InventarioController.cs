using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventarioController : ControllerBase
    {
        [HttpGet]
        public dynamic[] Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.inventario.Include(r => r.InventarioEstadoNavigation).Include(r => r.bodegaNavigation).Include(r => r.productoNavigation)
                    .Select(r => new { id_inventario = r.id_inventario, id_bodega = r.id_bodega, id_inventario_estado = r.id_inventario_estado,
                        nombre_bodega = r.bodegaNavigation.direccion, nombre_inventario_estado = r.InventarioEstadoNavigation.nombre_estado_inventario, nombre_producto = r.productoNavigation.nombre_producto, id_producto = r.id_producto,fecha_actualizacion = r.fecha_actualizacion, fecha_creacion=r.fecha_creacion   }).ToArray();
            }
        }
        [HttpGet("api/inventario/get_by_id")]
        public Inventario Get_by_id(string id_inventario)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.inventario.Where(r => r.id_inventario == id_inventario).FirstOrDefault();
            }
        }
        [HttpDelete("{id_inventario}")]
        public ActionResult Delete(string id_inventario) {
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.inventario.Where(r => r.id_inventario == id_inventario).FirstOrDefault();
                    if (query == null) return NotFound();
                    context.inventario.Remove(query);
                    context.SaveChanges();
                    return Ok();
                }
            }
            catch (System.Exception e)
            {
                return BadRequest();
            }

        }
        [HttpPost]
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
                new_inventario.user = "admin";
                context.inventario.Add(new_inventario);
                context.SaveChanges();
                return Ok();
            }
        }
        [HttpPut]
        public ActionResult Update([FromBody] InventarioViewModel inventario){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.inventario.Where(r=>r.id_inventario == inventario.id_inventario).FirstOrDefault();
                if (query == null) return NotFound();
                query.id_inventario = inventario.id_inventario;
                query.id_inventario_estado = inventario.id_inventario_estado;
                query.id_bodega = inventario.id_bodega;
                query.user = "Admin";
                query.id_producto = inventario.id_producto;
                query.fecha_actualizacion = DateTime.Now;
                context.SaveChanges();
                return Ok();
            }
        }
    }
}
