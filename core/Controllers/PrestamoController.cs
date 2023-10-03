using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrestamoController : ControllerBase
    {
        [HttpGet("api/prestamo/all")]
        public List<Prestamo> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.prestamos.ToList();
            }
        }
        [HttpGet("api/prestamo/get_by_id")]
        public Prestamo Get_by_id(long id_prestamo)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.prestamos.Where(r => r.id_prestamo == id_prestamo).FirstOrDefault();
            }
        }
        [HttpPost]
        public ActionResult Add([FromBody] PrestamoViewModel prestamo)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.prestamos.Where(r => r.id_prestamo == prestamo.id_prestamo).FirstOrDefault();
                if (query != null) return NotFound();
                Prestamo new_prestamo = new Prestamo();
                new_prestamo.id_prestamo = prestamo.id_prestamo;
                new_prestamo.rut = prestamo.rut;
                new_prestamo.entregado = false;
                new_prestamo.fecha_plazo = prestamo.fecha_plazo;
                new_prestamo.user = prestamo.user;
                new_prestamo.fecha_actualizacion = DateTime.Now;
                new_prestamo.fecha_creacion = DateTime.Now;
                context.Add(new_prestamo);
                context.SaveChanges();
                return Ok();
            }
        }
        public ActionResult Update([FromBody] PrestamoViewModel prestamo)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.prestamos.Where(r => r.id_prestamo == prestamo.id_prestamo).FirstOrDefault();
                if (query != null) return NotFound();
                query.rut = prestamo.rut;
                query.entregado = false;
                query.user = prestamo.user;
                query.fecha_plazo = prestamo.fecha_plazo;
                query.fecha_actualizacion = DateTime.Now;
                context.SaveChanges();
                return Ok();
            }
        }
    }
}
