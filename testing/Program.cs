using System;
using System.Diagnostics;
using System.IO;
using gestion_inventario.Models;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

class Program
{
    static void Main(string[] args)
    {
        // Configura la conexión a la base de datos
        var optionsBuilder = new DbContextOptionsBuilder<DbContextInventario>();
        optionsBuilder.UseSqlServer("YourConnectionString"); // Reemplaza "YourConnectionString" con tu cadena de conexión

        using (var context = new DbContextInventario(optionsBuilder.Options))
        {
            var excelExporter = new ExcelExporter();

            // Realiza la exportación de datos a un archivo Excel
            var excelData = excelExporter.ExportData(context);

            // Guarda el archivo Excel en el disco
            var filePath = "datos_inventario.xlsx";
            File.WriteAllBytes(filePath, excelData);

            Console.WriteLine($"Se ha generado el archivo: {filePath}");

            // Abre el archivo Excel con la aplicación predeterminada
            try
            {
                Process.Start(new ProcessStartInfo(filePath) { UseShellExecute = true });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"No se pudo abrir el archivo: {ex.Message}");
            }
        }
    }
}

public class ExcelExporter
{
    public byte[] ExportData(DbContextInventario context)
    {
        var workbook = new XSSFWorkbook();

        // Aquí se añade la lógica para exportar cada tabla a una hoja de Excel
        ExportToSheet(context, workbook, "Bodegas", context.bodegas.ToList());
        ExportToSheet(context, workbook, "Categorias", context.categorias.ToList());
        ExportToSheet(context, workbook, "Proveedores", context.proveedores.ToList());

        using (var memoryStream = new MemoryStream())
        {
            workbook.Write(memoryStream);
            return memoryStream.ToArray();
        }
    }

    private void ExportToSheet<T>(DbContextInventario context, IWorkbook workbook, string sheetName, IEnumerable<T> data)
    {
        ISheet sheet = workbook.CreateSheet(sheetName);

        // Obtener propiedades de la clase para usarlas como encabezados
        var properties = typeof(T).GetProperties();

        // Escribir encabezados en la primera fila
        IRow headerRow = sheet.CreateRow(0);
        for (int i = 0; i < properties.Length; i++)
        {
            ICell cell = headerRow.CreateCell(i);
            cell.SetCellValue(properties[i].Name);
        }

        // Escribir datos en las siguientes filas
        int rowNum = 1;
        foreach (var item in data)
        {
            IRow row = sheet.CreateRow(rowNum);

            for (int i = 0; i < properties.Length; i++)
            {
                object value = properties[i].GetValue(item);
                ICell cell = row.CreateCell(i);

                if (value != null)
                    cell.SetCellValue(value.ToString());
                else
                    cell.SetCellValue("");
            }

            rowNum++;
        }

        // Establecer el ancho para todas las columnas (el triple del ancho anterior)
        int tripleWidth = 150 * 20 * 3; // 300 píxeles * 20 unidades por píxel * 3
        for (int i = 0; i < properties.Length; i++)
        {
            sheet.SetColumnWidth(i, tripleWidth);
        }
    }

}
