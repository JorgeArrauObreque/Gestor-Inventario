using gestion_inventario.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using gestion_inventario.ViewModels;
namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        [HttpGet]
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
        [HttpDelete("{rut}")]
        public ActionResult Delete(string rut){
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.personas.Where(r=>r.rut == rut).FirstOrDefault();        
                    if (query == null) return NotFound();
                    context.personas.Remove(query);
                    context.SaveChanges();
                    return Ok();
                }   
            }
            catch (System.Exception e )
            {
                return BadRequest();
            }            
        }
        [HttpPost]
        public ActionResult Add([FromBody] PersonaViewModel persona){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.personas.Where(r=>r.rut == persona.rut).FirstOrDefault();        
                if (query != null) return BadRequest();
                Persona new_persona = new Persona();
                new_persona.nombres = persona.nombres;
                new_persona.apellidos = persona.apellidos;
                new_persona.rut = persona.rut;
                new_persona.carrera = persona.carrera;
                new_persona.genero = persona.genero;
                new_persona.fecha_actualizacion = DateTime.Now;
                new_persona.fecha_creacion = DateTime.Now;
                context.personas.Add(new_persona);
                context.SaveChanges();
                return Ok();
            }
        }
        [HttpPut]
        public ActionResult Update([FromBody] PersonaViewModel persona)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.personas.Where(r => r.rut == persona.rut).FirstOrDefault();
                if (query == null) return NotFound();
                query.nombres = persona.nombres;
                query.apellidos = persona.apellidos;
                query.carrera = persona.carrera;
                query.genero = persona.genero;
                query.fecha_actualizacion = DateTime.Now;
                context.SaveChanges();
                return Ok();
            }
        }
    }
}
