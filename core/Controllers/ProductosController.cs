using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    public class ProductosController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
