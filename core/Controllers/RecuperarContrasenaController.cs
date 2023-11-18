using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;

namespace gestion_inventario.Controllers
{
    public class RecuperarContrasenaController : Controller
    {
        public IActionResult Index()
        {

            return View();
        }
    }
}
