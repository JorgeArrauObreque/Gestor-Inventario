using gestion_inventario.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.Formula.Functions;
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


                IWorkbook workbook = new XSSFWorkbook();
                ISheet sheet = workbook.CreateSheet("DatosInventario");
                sheet.SetColumnWidth(0, 5000);
                sheet.SetColumnWidth(1, 5000);
                sheet.SetColumnWidth(2, 8000);
                sheet.SetColumnWidth(3, 5000);
                sheet.SetColumnWidth(4, 5000);
             

                ICellStyle cellStyle = workbook.CreateCellStyle();
                cellStyle.FillForegroundColor = IndexedColors.Yellow.Index;
                cellStyle.FillPattern = FillPattern.SolidForeground;

                IFont font = workbook.CreateFont();
                font.FontName = "Arial"; 
                font.FontHeightInPoints = 12; 
                font.Boldweight = 700;
                cellStyle.SetFont(font);
                cellStyle.BorderBottom = BorderStyle.Thin;
                cellStyle.BorderTop = BorderStyle.Thin;
                cellStyle.BorderLeft = BorderStyle.Thin;
                cellStyle.BorderRight = BorderStyle.Thin;


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
                headerRow.CreateCell(6).SetCellValue("estado");
                headerRow.GetCell(6).CellStyle = cellStyle;
                for (int i = 0; i < inventarios.Count; i++)
                {
                    IRow dataRow = sheet.CreateRow(i + 1);
                    dataRow.CreateCell(0).SetCellValue(inventarios[i].id_inventario);
                    dataRow.CreateCell(1).SetCellValue(inventarios[i].bodegaNavigation.nombre_bodega);
                    dataRow.CreateCell(2).SetCellValue(inventarios[i].productoNavigation.nombre_producto);
                    dataRow.CreateCell(3).SetCellValue(inventarios[i].productoNavigation.tipoProductoNavigation.nombre_tipo_producto);
                    dataRow.CreateCell(4).SetCellValue(inventarios[i].productoNavigation.marca);
                    dataRow.CreateCell(5).SetCellValue(inventarios[i].productoNavigation.categoriaNavigation.nombre_categoria);
                    dataRow.CreateCell(6).SetCellValue(inventarios[i].InventarioEstadoNavigation.nombre_estado_inventario);
                }

                
                using (MemoryStream stream = new MemoryStream())
                {
                    workbook.Write(stream);
                    return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "datos_inventario.xlsx");
                }
            }
        }

        [HttpGet("export_multiple")]
        public IActionResult ExportAll()
        {
            byte[] excelData;
            using (var memoryStream = new MemoryStream())
            {
                using (var workbook = new XSSFWorkbook())
                {
                    var context = new DbContextInventario(); // Asegúrate de inicializar tu DbContext aquí

                    ExportToSheet(context, workbook, "Bodegas", context.bodegas.ToList());
                    ExportToSheet(context, workbook, "Categorias", context.categorias.ToList());
                    ExportToSheet(context, workbook, "Proveedores", context.proveedores.ToList());
                    ExportToSheet(context, workbook, "Usuarios", context.usuariosSistema.ToList());
                    ExportToSheet(context, workbook, "Personas", context.personas.ToList());

                    workbook.Write(memoryStream);
                    excelData = memoryStream.ToArray();
                }
            }

            return File(excelData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "datos_inventario.xlsx");
        }

        private void ExportToSheet<T>(DbContextInventario context, IWorkbook workbook, string sheetName, IEnumerable<T> data)
        {
            ISheet sheet = workbook.CreateSheet(sheetName);

            var properties = typeof(T).GetProperties();

            IRow headerRow = sheet.CreateRow(0);
            for (int i = 0; i < properties.Length; i++)
            {
                NPOI.SS.UserModel.ICell cell = headerRow.CreateCell(i);
                cell.SetCellValue(properties[i].Name);
            }

            int rowNum = 1;
            foreach (var item in data)
            {
                IRow row = sheet.CreateRow(rowNum);

                for (int i = 0; i < properties.Length; i++)
                {
                    object value = properties[i].GetValue(item);
                    NPOI.SS.UserModel.ICell cell = row.CreateCell(i);

                    if (value != null)
                        cell.SetCellValue(value.ToString());
                    else
                        cell.SetCellValue("");
                }

                rowNum++;
            }

            int width = 150 * 20 * 3; 
            for (int i = 0; i < properties.Length; i++)
            {
                sheet.SetColumnWidth(i, width);
            }
        }

    }
}
