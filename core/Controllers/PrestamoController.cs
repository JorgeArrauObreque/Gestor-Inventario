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
        [HttpGet("get_details")]
        public List<PrestamoDetalle> Get_detalles(string id_prestamo)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.prestamo_detalles.Include(r => r.prestamoNavigation).Include(r=>r.inventarioNavigation)
                    .Include(r=>r.inventarioNavigation.productoNavigation).Include(r=>r.inventarioNavigation.productoNavigation.categoriaNavigation).Where(r=>r.id_prestamo == long.Parse( id_prestamo)).ToList();
                return query;
            }
        }
        [HttpPost("GenerarPrestamo")]
        public ActionResult GenerarPrestamo([FromBody] PrestamoRequest prestamo_request)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                Prestamo prestamo = new Prestamo();
                prestamo.rut = prestamo_request.id_solicitante;
                prestamo.entregado = false;
                prestamo.fecha_creacion = DateTime.Now;
                prestamo.fecha_actualizacion = DateTime.Now;
                prestamo.fecha_plazo = Convert.ToDateTime(prestamo_request.fecha_plazo);
                prestamo.id_user = 2;
                context.Add(prestamo);
                context.SaveChanges();
                foreach (var item in prestamo_request.id_inventarios)
                {
                    var validacion = context.prestamo_detalles.Include(r => r.prestamoNavigation)
                        .Where(r => r.prestamoNavigation.rut == prestamo_request.id_solicitante && r.entregado == true && r.id_inventario == item).FirstOrDefault();
                    if (validacion == null)
                    {
                        PrestamoDetalle detalle = new PrestamoDetalle();
                        detalle.id_inventario = item;
                        detalle.id_prestamo = prestamo.id_prestamo;
                        detalle.entregado = false;
                        detalle.fecha_entrega = null;
                        context.Add(detalle);
                    }
                
                }
                
                context.SaveChanges();
                return Ok();
            }
        }
        [HttpGet("get_inventario")]
        public dynamic Get_Inventario_by_id(string id)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = (from inventario in context.inventario
                             join producto in context.productos on inventario.id_producto equals producto.id_producto
                             join categoria in context.categorias on producto.id_categoria equals categoria.id_categoria
                             join tipo_producto in context.tipos_producto on producto.id_tipo_producto equals tipo_producto.id_tipo_producto
                             where inventario.id_inventario == id
                             select new { id_inventario = inventario.id_inventario, nombre_producto = producto.nombre_producto,
                             nombre_categoria = categoria.nombre_categoria, marca = producto.marca, tipo_producto = tipo_producto.nombre_tipo_producto}).FirstOrDefault();
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
        [HttpGet("devolver")]
        public ActionResult PrestamoEntregado([FromQuery] prestamoEntrega entrega)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.prestamo_detalles.Include(r => r.prestamoNavigation).Where(r => r.id_inventario == entrega.id_inventario && r.prestamoNavigation.rut == entrega.rut && r.entregado == false).FirstOrDefault();
                query.entregado = true;
                query.fecha_entrega = DateTime.Now;
                context.SaveChanges();

                var validacion = context.prestamo_detalles.Where(r => r.id_prestamo == query.id_prestamo).Where(r=>r.entregado == false).Count();
                if (validacion ==0)
                {
                    var prestamo = context.prestamos.Where(r => r.id_prestamo == query.id_prestamo).FirstOrDefault();
                    prestamo.entregado = true;
                    context.SaveChanges();
                }
                return Ok();
            }
        }
        [HttpGet("get_prestamos_persona")]
        public dynamic GetPrestamosPersona(string rut)
        {
            using (DbContextInventario context= new DbContextInventario())
            {
                var persona = context.personas.Where(r=>r.rut == rut).Include(r => r.TipoPersonaNavegation).FirstOrDefault();
                var query = context.prestamo_detalles.Include(r => r.prestamoNavigation)
                    .Include(r => r.prestamoNavigation.personaNavigation)
                    .Include(r => r.inventarioNavigation).Include(r=>r.inventarioNavigation.productoNavigation).Include(r => r.inventarioNavigation.productoNavigation.categoriaNavigation)

                    .Where(r=>r.prestamoNavigation.personaNavigation.rut == rut).ToList();
                
                return new { persona = persona,prestamos = query};
            }
        }

        
    }
    public class prestamoEntrega
    {
        public string rut { get; set; }
        public string id_inventario { get; set; }
    }
}
