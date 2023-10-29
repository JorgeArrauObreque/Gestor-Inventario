using gestion_inventario.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;


namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InformeController : ControllerBase
    {
        [HttpGet("export")]
        public IActionResult Export()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var inventarios = context.inventario
                    .Include(r => r.bodegaNavigation)
                    .Include(r => r.productoNavigation)
                    .Include(r => r.productoNavigation.tipoProductoNavigation).
                    Include(r=>r.InventarioEstadoNavigation)
                    .ToList();

                // Crear un nuevo libro de Excel
                IWorkbook workbook = new XSSFWorkbook();
                ISheet sheet = workbook.CreateSheet("DatosInventario");

                // Definir encabezados
                IRow headerRow = sheet.CreateRow(0);
                headerRow.CreateCell(0).SetCellValue("ID Inventario");
                headerRow.CreateCell(1).SetCellValue("Nombre Bodega");
                headerRow.CreateCell(2).SetCellValue("Nombre Producto");
                headerRow.CreateCell(3).SetCellValue("Tipo Producto");
                headerRow.CreateCell(4).SetCellValue("Cantidad");

                // Llenar la hoja de trabajo con datos
                for (int i = 0; i < inventarios.Count; i++)
                {
                    IRow dataRow = sheet.CreateRow(i + 1);
                    dataRow.CreateCell(0).SetCellValue(inventarios[i].id_inventario);
                    dataRow.CreateCell(1).SetCellValue(inventarios[i].bodegaNavigation.nombre_bodega);
                    dataRow.CreateCell(2).SetCellValue(inventarios[i].productoNavigation.nombre_producto);
                    dataRow.CreateCell(3).SetCellValue(inventarios[i].productoNavigation.tipoProductoNavigation.nombre_tipo_producto);
                    dataRow.CreateCell(4).SetCellValue(inventarios[i].user);
                }

                // Crear un flujo de memoria para el libro de Excel
                using (MemoryStream stream = new MemoryStream())
                {
                    workbook.Write(stream);

                    // Devuelve el archivo Excel como una respuesta para descargar
                    return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "datos_inventario.xlsx");
                }
            }
        }
    }
}
