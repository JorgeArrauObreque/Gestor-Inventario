﻿using gestion_inventario.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using gestion_inventario.ViewModels;
using Microsoft.EntityFrameworkCore;
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
                return context.personas.OrderBy(r=>r.rut).ToList();
            }
        }
        [HttpGet("get_by_rut")]
        public dynamic Get_by_rut(string rut)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.personas.Include(r=>r.TipoPersonaNavegation).Where(r => r.rut == rut)
                    .Select(r => new {rut = r.rut, nombres=r.nombres, apellidos = r.apellidos, carrera = r.carrera, tipo= r.TipoPersonaNavegation.nombre_tipo_persona }).FirstOrDefault();
                
                return query;
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
                new_persona.id_tipo_persona = 1;
                new_persona.id_credencial = "testing123";
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
