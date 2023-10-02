using gestion_inventario.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        [HttpGet("api/personas/all")]
        public List<Persona> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.personas.ToList();
            }
        }
        [HttpGet("api/personas/get_by_rut")]
        public Persona Get_by_rut(string rut)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.personas.Where(r => r.rut == rut).FirstOrDefault();
            }
        }
        [HttpDelete]
        public ActionResult Personas(int id_persona){
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.personas.Where(r=>r.id_persona == id_persona).FirstOrDefault();        
                    if (query == null) return NotFound();
                    context.personas.Remove(query);
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
