using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventarioEstadoController : ControllerBase
    {
        [HttpGet]
        public List<InventarioEstado> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.inventario_estados.ToList();
            }
        }
        [HttpGet("get_by_id")]
        public InventarioEstado Get_by_id(int id_inventario_estado)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.inventario_estados.Where(r => r.id_inventario_estado == id_inventario_estado).FirstOrDefault();
            }
        }
        [HttpDelete("{id_inventario_estado}")]
        public ActionResult Delete (int id_inventario_estado){
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.inventario_estados.Where(r=>r.id_inventario_estado == id_inventario_estado).FirstOrDefault();
                    if (query == null) return NotFound();
                    context.inventario_estados.Remove(query);
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
        public ActionResult Add([FromBody] InventarioEstadoViewModel inventario_estado){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.inventario_estados.Where(r=>r.id_inventario_estado == inventario_estado.id_inventario_estado).FirstOrDefault();
                if (query != null) return BadRequest();
                InventarioEstado new_inventario_estado = new InventarioEstado();
                new_inventario_estado.id_inventario_estado = inventario_estado.id_inventario_estado;
                new_inventario_estado.nombre_estado_inventario = inventario_estado.nombre_estado_inventario;
                new_inventario_estado.fecha_actualizacion = DateTime.Now;
                context.inventario_estados.Add(new_inventario_estado);
                context.SaveChanges();
                return Ok();
            }
        }
        [HttpPut]
        public ActionResult Update([FromBody] InventarioEstadoViewModel inventario_estado){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.inventario_estados.Where(r=>r.id_inventario_estado == inventario_estado.id_inventario_estado).FirstOrDefault();
                if (query == null) return NotFound();
                query.id_inventario_estado =  inventario_estado.id_inventario_estado;
                query.nombre_estado_inventario = inventario_estado.nombre_estado_inventario;
                query.fecha_actualizacion = DateTime.Now;
                context.SaveChanges();
                return Ok();
            }
        }
    }
}
