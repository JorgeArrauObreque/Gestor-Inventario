using gestion_inventario.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.Formula.Functions;
using System.Globalization;

namespace gestion_inventario.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EstadisticasController : ControllerBase 
    {
        [HttpGet("dashboard")]
        public dynamic Dashboard()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                int cantidad_productos_inventario = context.inventario.Count();

                DateTime today = DateTime.Today;
                DateTime startOfWeek = today.AddDays(-(int)today.DayOfWeek);
                DateTime endOfWeek = startOfWeek.AddDays(7).AddSeconds(-1);

                int prestamos_semana = context.prestamos
                    .Where(r => r.fecha_creacion >= startOfWeek && r.fecha_creacion <= endOfWeek)
                    .Count();



                var productoConMasPrestamos = context.prestamo_detalles.Include(r => r.inventarioNavigation).Include(r => r.inventarioNavigation.productoNavigation)
                    .GroupBy(detalle_prestamo => detalle_prestamo.inventarioNavigation.productoNavigation)
                    .Select(productoGroup => new
                    {
                        Producto = productoGroup.Key,
                        TotalPrestamos = productoGroup.Count()
                    })
                    .AsEnumerable()  // Forzar la evaluación en el lado del cliente
                    .OrderByDescending(result => result.TotalPrestamos)
                    .FirstOrDefault();

            




                var productoConMenosPrestamos = context.prestamo_detalles.Include(r => r.inventarioNavigation).Include(r => r.inventarioNavigation.productoNavigation)
                .GroupBy(detalle_prestamo => detalle_prestamo.inventarioNavigation.productoNavigation)
                .Select(productoGroup => new
                {
                    Producto = productoGroup.Key,
                    TotalPrestamos = productoGroup.Count()
                })
                .AsEnumerable()  // Forzar la evaluación en el lado del cliente
                .OrderBy(result => result.TotalPrestamos)
                .FirstOrDefault();

           

                DateTime siete_dias_atras = DateTime.Now.AddDays(-7);

                var prestamos_siete_dias = context.prestamos
                    .Where(r => r.fecha_creacion >= siete_dias_atras) // Filtra los préstamos de los últimos siete días
                    .GroupBy(r => r.fecha_creacion.Date) // Agrupa por la fecha (ignorando la hora)
                    .Select(group => new
                    {
                        Fecha = group.Key.ToString("dd-MM-yyyy"),
                        DiaDeLaSemana = group.Key.ToString("dddd", new CultureInfo("es-ES")), // Obtiene el nombre del día de la semana
                        CantidadPrestamos = group.Count()
                    })
                    .ToList();

                return new { cantidad_productos_inventario= cantidad_productos_inventario, prestamos_semana = prestamos_semana, productoConMasPrestamos= productoConMasPrestamos, productoConMenosPrestamos= productoConMenosPrestamos, prestamos_siete_dias = prestamos_siete_dias };
            }

        }
    }
}
