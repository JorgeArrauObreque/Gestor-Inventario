using gestion_inventario.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventarioEstadoController : ControllerBase
    {
        [HttpGet("api/inventarioEstado/all")]
        public List<InventarioEstado> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.inventario_estados.ToList();
            }
        }
        [HttpGet("api/inventarioEstado/get_by_id")]
        public InventarioEstado Get_by_id(int id_inventario_estado)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.inventario_estados.Where(r => r.id_inventario_estado == id_inventario_estado).FirstOrDefault();
            }
        }
        public ActionResult Delete (int id_inventario_estado){
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.inventario_estados.Where(r=>r.id_inventario_estado == id_inventario_estado).FirstOrDefault();
                    if (query == null) return NotFound();
                    context.inventario_estados.Remove(query);
                    return Ok();
                }    
            }
            catch (System.Exception e)
            {
                return BadRequest();
            }
            
        }
    }
}
