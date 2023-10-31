using gestion_inventario.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NPOI.SS.Formula.Functions;

namespace gestion_inventario.Controllers
{
    [Authorize]
    public class EstadisticasController : Controller
    {
        public IActionResult Dashboard()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = from detalle_prestamo in context.prestamo_detalles
                            group detalle_prestamo by detalle_prestamo.inventarioNavigation.productoNavigation into productoGroup
                            let totalPrestamos = productoGroup.Count()
                            orderby totalPrestamos descending
                            select new
                            {
                                Producto = productoGroup.Key,
                                TotalPrestamos = totalPrestamos
                            };

                var productoConMasPrestamos = query.FirstOrDefault();
                return View();
            }
                
        }
    }
}
