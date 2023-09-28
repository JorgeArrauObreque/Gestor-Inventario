using gestion_inventario.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BodegaController : ControllerBase
    {
        [HttpGet("api/bodega/all")]
        public List<Bodega> Get_All()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.bodegas.ToList();
            }
        }
        [HttpGet("api/bodega/get_by_id")]
        public Bodega Get_by_id(int id)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.bodegas.Where(r => r.id_bodega == id).FirstOrDefault();
            }
        }
    }
}
