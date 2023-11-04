using gestion_inventario.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using NPOI.XWPF.UserModel;
using System.Drawing;

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
                    .Include(r => r.productoNavigation.categoriaNavigation)
                    .Include(r => r.productoNavigation.tipoProductoNavigation)
                    .Include(r=>r.InventarioEstadoNavigation)
                    .ToList();



                // Crear un nuevo libro de Excel
                IWorkbook workbook = new XSSFWorkbook();
                ISheet sheet = workbook.CreateSheet("DatosInventario");
                sheet.SetColumnWidth(0, 5000);
                sheet.SetColumnWidth(1, 5000);
                sheet.SetColumnWidth(2, 8000);
                sheet.SetColumnWidth(3, 5000);
                sheet.SetColumnWidth(4, 5000);
                //estilos 

                ICellStyle cellStyle = workbook.CreateCellStyle();
                cellStyle.FillForegroundColor = IndexedColors.Yellow.Index;
                cellStyle.FillPattern = FillPattern.SolidForeground;

                IFont font = workbook.CreateFont();
                font.FontName = "Arial"; // Nombre de la fuente
                font.FontHeightInPoints = 12; // Tamaño de fuente
                font.Boldweight = 700;
                cellStyle.SetFont(font);
                cellStyle.BorderBottom = BorderStyle.Thin;
                cellStyle.BorderTop = BorderStyle.Thin;
                cellStyle.BorderLeft = BorderStyle.Thin;
                cellStyle.BorderRight = BorderStyle.Thin;


                // Definir encabezados
                IRow headerRow = sheet.CreateRow(0);
              
                headerRow.CreateCell(0).SetCellValue("ID Inventario");
                headerRow.GetCell(0).CellStyle = cellStyle;
                headerRow.CreateCell(1).SetCellValue("Nombre Bodega");
                headerRow.GetCell(1).CellStyle = cellStyle;
                headerRow.CreateCell(2).SetCellValue("Nombre Producto");
                headerRow.GetCell(2).CellStyle = cellStyle;
                headerRow.CreateCell(3).SetCellValue("Tipo Producto");
                headerRow.GetCell(3).CellStyle = cellStyle;
                headerRow.CreateCell(4).SetCellValue("Marca");
                headerRow.GetCell(4).CellStyle = cellStyle;
                headerRow.CreateCell(5).SetCellValue("Categoría");
                headerRow.GetCell(5).CellStyle = cellStyle;
                // Llenar la hoja de trabajo con datos
                for (int i = 0; i < inventarios.Count; i++)
                {
                    IRow dataRow = sheet.CreateRow(i + 1);
                    dataRow.CreateCell(0).SetCellValue(inventarios[i].id_inventario);
                    dataRow.CreateCell(1).SetCellValue(inventarios[i].bodegaNavigation.nombre_bodega);
                    dataRow.CreateCell(2).SetCellValue(inventarios[i].productoNavigation.nombre_producto);
                    dataRow.CreateCell(3).SetCellValue(inventarios[i].productoNavigation.tipoProductoNavigation.nombre_tipo_producto);
                    dataRow.CreateCell(4).SetCellValue(inventarios[i].productoNavigation.marca);
                    dataRow.CreateCell(5).SetCellValue(inventarios[i].productoNavigation.categoriaNavigation.nombre_categoria);
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
