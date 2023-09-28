using gestion_inventario.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProveedoresController : ControllerBase
    {
        [HttpGet("api/proveedor/all")]
        public List<Proveedor> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.proveedores.ToList();
            }
        }
        [HttpGet("api/proveedor/get_by_id")]
        public Proveedor Get_by_id(int id_proveedor)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.proveedores.Where(r => r.id_proveedor == id_proveedor).FirstOrDefault();
            }
        }
    }
}
