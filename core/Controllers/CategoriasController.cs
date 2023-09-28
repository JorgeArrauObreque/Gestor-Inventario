using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using gestion_inventario.Models;
using gestion_inventario.ViewModels;

namespace gestion_inventario.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        [HttpGet("api/categoria/all")]
        public List<Categoria> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.categorias.ToList();
            }
        }
        [HttpGet("api/categoria/get_by_categoria")]
        public Categoria Get_by_id(int id_categoria)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.categorias.Where(r=>r.id_categoria == id_categoria).FirstOrDefault();
            }
        }
        [HttpPost]
        public ActionResult Add_update([FromBody]CategoriaViewModel categoriamodel)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.categorias.Where(r => r.id_categoria == categoriamodel.id_categoria).FirstOrDefault();
                if (query== null)
                {
                    Categoria categoria = new Categoria();
                    categoria.nombre_categoria = categoriamodel.nombre_categoria; ;
                    context.categorias.Add(categoria);
                    context.SaveChanges();
                    return Ok();
                }
                return BadRequest();
            
            }
        }
    }
}
