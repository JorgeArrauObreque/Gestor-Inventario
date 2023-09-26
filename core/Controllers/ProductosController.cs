using gestion_inventario.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
namespace gestion_inventario.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductosController : ControllerBase
    {
        [HttpGet]
        public Producto[] Index()
        {
            using (DbContextInventario context = new DbContextInventario())
            {

                return context.productos.Include(r => r.ProveedorNavigation).ToArray(); 
            }
        }
    }
}
