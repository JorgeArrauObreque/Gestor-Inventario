using gestion_inventario.Models;
using Microsoft.EntityFrameworkCore;

using (DbContextInventario context = new DbContextInventario())
{
    int cantidad_productos_inventario = context.inventario.Count();

    DateTime today = DateTime.Today;
    DateTime startOfWeek = today.AddDays(-(int)today.DayOfWeek);
    DateTime endOfWeek = startOfWeek.AddDays(7).AddSeconds(-1);

    int prestamos_semana = context.prestamos
        .Where(r => r.fecha_creacion >= startOfWeek && r.fecha_creacion <= endOfWeek)
        .Count();



    var productoConMasPrestamos = context.prestamo_detalles.Include(r=>r.inventarioNavigation).Include(r=>r.inventarioNavigation.productoNavigation)
        .GroupBy(detalle_prestamo => detalle_prestamo.inventarioNavigation.productoNavigation)
        .Select(productoGroup => new
        {
            Producto = productoGroup.Key,
            TotalPrestamos = productoGroup.Count()
        })
        .AsEnumerable()  // Forzar la evaluación en el lado del cliente
        .OrderByDescending(result => result.TotalPrestamos)
        .FirstOrDefault();

    if (productoConMasPrestamos != null)
    {
        Console.WriteLine($"El producto con más préstamos es: {productoConMasPrestamos.Producto.nombre_producto}");
        Console.WriteLine($"Total de préstamos: {productoConMasPrestamos.TotalPrestamos}");
    }
    else
    {
        Console.WriteLine("No hay productos en la base de datos.");
    }




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

    if (productoConMenosPrestamos != null)
    {
        Console.WriteLine($"El producto con más préstamos es: {productoConMenosPrestamos.Producto.nombre_producto}");
        Console.WriteLine($"Total de préstamos: {productoConMenosPrestamos.TotalPrestamos}");
    }
    else
    {
        Console.WriteLine("No hay productos en la base de datos.");
    }
}
