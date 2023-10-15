using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        [HttpPut]
        public ActionResult Update([FromBody] UsuariosViewModel usuario)
        {
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.usuariosSistema.SingleOrDefault(r => r.id_user == int.Parse(usuario.id_user));
                    if (query == null)
                    {
                        return NotFound("Usuario no encontrado");
                    }

                    query.email = usuario.email;
                    query.username = usuario.username;
                    query.id_rol = int.Parse(usuario.id_rol);
                    query.fecha_actualizacion = DateTime.Now;
                    context.SaveChanges();

                    return Ok("Usuario actualizado correctamente");
                }
            }
            catch (Exception ex)
            {
                // Maneja excepciones aquí y registra detalles del error
                return StatusCode(500, "Error interno del servidor: " + ex.Message);
            }
        }
        [HttpPost]
        public ActionResult Add([FromBody] UsuariosViewModel usuario)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                if (context.usuariosSistema.Where(r => r.id_user == int.Parse(usuario.id_user)).FirstOrDefault() != null) return BadRequest();
                var new_usuario = new Usuario();

                new_usuario.email = usuario.email;
                new_usuario.username = usuario.username;
                new_usuario.id_rol = int.Parse(usuario.id_rol);
                new_usuario.password = "123";
                context.Add(new_usuario);
                context.SaveChanges();
                return Ok("Creado correctamente");
            }
        }
        [HttpDelete("{id_usuario}")]
        public ActionResult Delete(int id_usuario)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.usuariosSistema.Where(r => r.id_user == id_usuario).FirstOrDefault();
                if (query == null) return BadRequest();
                context.usuariosSistema.Remove(query);
                context.SaveChanges();
                return Ok();
            }
        }
    }
}
