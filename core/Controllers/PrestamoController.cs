using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrestamoController : ControllerBase
    {
        [HttpGet]
        public List<Prestamo> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.prestamos.Include(r=>r.personaNavigation).OrderBy(r => r.id_prestamo).ToList();
                return query;
            }
        }
        [HttpGet("{id_prestamo}")]
        public Prestamo Get_by_id(long id_prestamo)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.prestamos.Where(r => r.id_prestamo == id_prestamo).FirstOrDefault();
            }
        }
        [HttpGet("get_No_back")]
        public List<PrestamoDetalle> Get_No_Back()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.prestamo_detalles.Include(r=>r.prestamoNavigation).Include(r=>r.prestamoNavigation.personaNavigation).Where(r => r.entregado == false).ToList();
            }
        }
        [HttpGet("get_by_id_inventario")]
        public PrestamoDetalle get_by_id_inventario(string id)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query  = context.prestamo_detalles.Include(r => r.prestamoNavigation)
                    .Include(r => r.prestamoNavigation.personaNavigation)
                    .Where(r => r.entregado == false && r.id_inventario == id).OrderByDescending(r=>r.fecha_entrega).FirstOrDefault();
                return query;
            }
        }


        [HttpPost]
        public ActionResult Add([FromBody] PrestamoViewModel prestamo)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.prestamos.Where(r => r.id_prestamo == 0).FirstOrDefault();
                if (query != null) return NotFound();
                Prestamo new_prestamo = new Prestamo();
                //new_prestamo.id_prestamo = 1;
                new_prestamo.rut = prestamo.rut;
                new_prestamo.entregado = false;
                new_prestamo.fecha_plazo = prestamo.fecha_plazo;
                new_prestamo.id_user = 2;
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
                var query = context.prestamos.Where(r => r.id_prestamo == 1).FirstOrDefault();
                if (query != null) return NotFound();
                query.rut = prestamo.rut;
                query.entregado = false;
                query.id_user = 2;
                query.fecha_plazo = new DateTime(prestamo.fecha_plazo.Year,prestamo.fecha_plazo.Month, prestamo.fecha_plazo.Day, DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second);                
                query.fecha_actualizacion = DateTime.Now;
                context.SaveChanges();
                return Ok();
            }
        }

        
    }
}
