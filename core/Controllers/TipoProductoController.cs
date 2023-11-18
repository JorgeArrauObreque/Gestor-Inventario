using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoProductoController : ControllerBase
    {
        [HttpGet]
        public List<TipoProducto> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.tipos_producto.ToList();
            }
        }
        [HttpGet("api/tipoProducto/get_by_id")]
        public TipoProducto Get_by_id(int id_tipo_producto)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
               return context.tipos_producto.Where(r => r.id_tipo_producto == id_tipo_producto).FirstOrDefault();
            }
        }
        [HttpDelete("{id_tipo_producto}")]
        public ActionResult Delete(int id_tipo_producto){
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.tipos_producto.Where(r=>r.id_tipo_producto == id_tipo_producto).FirstOrDefault();
                    if (query == null)  return NotFound();
                    context.tipos_producto.Remove(query);
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
        public ActionResult Add([FromBody] TipoProductoViewModel tipo_producto){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.tipos_producto.Where(r=>r.id_tipo_producto == tipo_producto.id_tipo_producto).FirstOrDefault();
                if (query != null) return BadRequest();
                TipoProducto new_tipo_producto = new TipoProducto();
                new_tipo_producto.id_tipo_producto = tipo_producto.id_tipo_producto;
                new_tipo_producto.nombre_tipo_producto = tipo_producto.nombre_tipo_producto;
                new_tipo_producto.fecha_creacion = DateTime.Now;
                new_tipo_producto.fecha_actualizacion = DateTime.Now;
                context.tipos_producto.Add(new_tipo_producto);
                context.SaveChanges();
                return Ok();
            }
        }
        [HttpPut]
        public ActionResult Update([FromBody] TipoProductoViewModel tipo_producto){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.tipos_producto.Where(r=>r.id_tipo_producto == tipo_producto.id_tipo_producto).FirstOrDefault();
                if (query == null) return NotFound();
                query.id_tipo_producto = tipo_producto.id_tipo_producto;
                query.nombre_tipo_producto = tipo_producto.nombre_tipo_producto;
                query.fecha_actualizacion = DateTime.Now;
                context.SaveChanges();
                return Ok();
            }
        }
    }
}
