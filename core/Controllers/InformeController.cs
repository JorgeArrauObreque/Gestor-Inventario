using Microsoft.AspNetCore.Mvc;
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
            // Crear un nuevo libro de Excel
            IWorkbook workbook = new XSSFWorkbook();

            // Crear una hoja de trabajo
            ISheet sheet = workbook.CreateSheet("HolaMundoSheet");

            // Crear una fila
            IRow row = sheet.CreateRow(0);

            // Crear una celda y escribir "Hola Mundo" en ella
            ICell cell = row.CreateCell(0);
            cell.SetCellValue("Hola Mundo");

            // Crear un flujo de memoria para el libro de Excel
            using (MemoryStream stream = new MemoryStream())
            {
                workbook.Write(stream);

                // Devuelve el archivo Excel como una respuesta para descargar
                return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "hola_mundo.xlsx");
            }
        }
    }
}
