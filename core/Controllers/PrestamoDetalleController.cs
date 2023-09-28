using gestion_inventario.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrestamoDetalleController : ControllerBase
    {
        [HttpGet("api/prestamoDetalle/all")]
        public List<PrestamoDetalle> Get_all() 
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.prestamo_detalles.ToList();
            }
        }
        [HttpGet("api/prestamoDetalle/get_by_id")]
        public PrestamoDetalle Get_by_id(long id_prestamo_detalle)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.prestamo_detalles.Where(r => r.id_prestamo_detalle == id_prestamo_detalle).FirstOrDefault();
            }
        }
    }
}
