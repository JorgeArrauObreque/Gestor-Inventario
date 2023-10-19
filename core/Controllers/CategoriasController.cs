using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CategoriasController : ControllerBase
    {
        [HttpGet]
      
        public List<Categoria> Get_all()
        {

            using (DbContextInventario context = new DbContextInventario())
            {
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].ToString();
                var token = authorizationHeader?.Split(" ").LastOrDefault(); // Obtén el último segmento después del espacio en blanco (Bearer)

                if (!string.IsNullOrEmpty(token))
                {
                    try
                    {
                        var tokenHandler = new JwtSecurityTokenHandler();
                        var jwtToken = tokenHandler.ReadJwtToken(token);

                        // Obtén las reclamaciones del token como una colección de objetos Claim
                        var claims = jwtToken.Claims.ToList();

                        // Ahora puedes acceder a las reclamaciones según tus necesidades
                        foreach (var claim in claims)
                        {
                            // Accede a las propiedades del claim, como Type y Value
                            var claimType = claim.Type;
                            var claimValue = claim.Value;

                            // Usa 'claimType' y 'claimValue' según tus necesidades
                        }
                    }
                    catch (Exception)
                    {
                        // Maneja la excepción si el token no es válido
                    }
                }
                return context.categorias.ToList();
            }
        }
        [HttpGet("api/categoria/get_by_categoria")]
        public Categoria Get_by_id(string id_categoria)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.categorias.Where(r => r.id_categoria == id_categoria).FirstOrDefault();
            }
        }
        [HttpPost]
        public ActionResult Add([FromBody] CategoriaViewModel categoriamodel)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.categorias.Where(r => r.id_categoria == categoriamodel.id_categoria).FirstOrDefault();
                if (query != null) return BadRequest();
                
                    Categoria categoria = new Categoria();
                    categoria.id_categoria = categoriamodel.id_categoria;
                    categoria.nombre_categoria = categoriamodel.nombre_categoria; ;
                    categoria.fecha_actualizacion = DateTime.Now;
                    categoria.fecha_creacion = DateTime.Now;
                    context.categorias.Add(categoria);
                    context.SaveChanges();
                    return Ok();

            }
        }
        [HttpDelete("{id_categoria}")]
        public ActionResult Delete(string id_categoria)
        {
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.categorias.Where(r => r.id_categoria == id_categoria).FirstOrDefault();
                    if (query == null)
                    {
                        return NotFound("categoria no encontrada");
                    }
                    context.categorias.Remove(query);
                    context.SaveChanges();
                    return Ok("categoria eliminada correctamente");
                }
            }

            catch (System.Exception e)
            {

                return BadRequest();
            }
        }
        [HttpPut]
        public ActionResult Update([FromBody]CategoriaViewModel categoria){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.categorias.Where(r=>r.id_categoria == categoria.id_categoria).FirstOrDefault();
                if (query == null) return NotFound();
                query.id_categoria = categoria.id_categoria;
                query.nombre_categoria = categoria.nombre_categoria;
                query.fecha_actualizacion = DateTime.Now;
                context.SaveChanges();
                return Ok();
            }
        }
        
    }
}
