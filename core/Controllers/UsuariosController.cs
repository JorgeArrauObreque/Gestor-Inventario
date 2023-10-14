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
    }
}
