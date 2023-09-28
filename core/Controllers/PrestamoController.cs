using gestion_inventario.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrestamoController : ControllerBase
    {
        [HttpGet("api/prestamo/all")]
        public List<Prestamo> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.prestamos.ToList();
            }
        }
        [HttpGet("api/prestamo/get_by_id")]
        public Prestamo Get_by_id(long id_prestamo)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.prestamos.Where(r => r.id_prestamo == id_prestamo).FirstOrDefault();
            }
        }
    }
}
