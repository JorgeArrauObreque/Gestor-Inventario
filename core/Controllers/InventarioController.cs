using gestion_inventario.Models;
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
    }
}
