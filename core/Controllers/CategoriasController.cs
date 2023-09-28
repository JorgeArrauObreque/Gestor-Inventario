using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using gestion_inventario.Models;
namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
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
    }
}
