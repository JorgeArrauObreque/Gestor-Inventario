using gestion_inventario.Models;
using gestion_inventario.ViewModels;
<<<<<<< HEAD
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
=======
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

>>>>>>> main
namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
<<<<<<< HEAD
    [Authorize]
    public class HistoricoMovimientoController : ControllerBase
    {
        [HttpGet("all")]
        public dynamic Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = (from movimientos in context.historico_movimientos
                            join tipo in context.movimiento_tipos on movimientos.id_tipo_movimiento equals tipo.id_movimiento_tipo
                            join inventario in context.inventario on movimientos.id_inventario equals inventario.id_inventario
                            join producto in context.productos on inventario.id_producto equals producto.id_producto
                            join categoria in context.categorias on producto.id_categoria equals categoria.id_categoria
                            select new { id_movimiento = movimientos.id_movimiento, nombre_movimiento = tipo.nombre_movimiento_tipo, fecha_creacion = movimientos.fecha_creacion.ToString("dd-MM-yyyy HH:mm"),
                            id_inventario = inventario.id_inventario, nombre_producto = producto.nombre_producto, marca = producto.marca, categoria =  categoria.nombre_categoria}).OrderBy(r=>r.id_movimiento).ToList();


                return query;
=======
    public class HistoricoMovimientoController : ControllerBase
    {
        [HttpGet("api/historicoMovimiento/all")]
        public List<HistoricoMovimiento> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.historico_movimientos.ToList ();
>>>>>>> main
            }
        }
        [HttpGet("api/historicoMovimiento/get_by_id")]
        public HistoricoMovimiento Get_by_id(int  id_historico_movimiento)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.historico_movimientos.Where(r=>r.id_movimiento ==id_historico_movimiento).FirstOrDefault();
            }
        }
        [HttpDelete]
        public ActionResult Delete(int id_historico_movimiento){
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.historico_movimientos.Where(r=>r.id_tipo_movimiento == id_historico_movimiento).FirstOrDefault();
                    if (query == null) return NotFound();
                    context.historico_movimientos.Remove(query);
                    return Ok();
                }    
            }
            catch (System.Exception e)
            {
                return BadRequest();
            }
            
        }
        [HttpPost]
        public ActionResult Add([FromBody] HistoricoMovimientoViewModel historicoMovimiento){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.historico_movimientos.Where(r=>r.id_movimiento == historicoMovimiento.id_movimiento).FirstOrDefault();
                if(query !=  null) return NotFound();
                HistoricoMovimiento historico = new HistoricoMovimiento();
                historico.id_tipo_movimiento  = historicoMovimiento.id_tipo_movimiento;
                historico.comentarios = historicoMovimiento.comentarios;
                historico.fecha_creacion = DateTime.Now;
                historico.fecha_actualizacion = DateTime.Now;
                historico.id_user = 1;
                context.historico_movimientos.Add(historico);
                context.SaveChanges();
                return Ok();
            }
        }
        [HttpPut]
        public ActionResult Update([FromBody]HistoricoMovimiento historicoMovimiento){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.historico_movimientos.Where(r=>r.id_movimiento == historicoMovimiento.id_movimiento).FirstOrDefault();
                if(query ==  null) return NotFound();
                query.fecha_actualizacion = DateTime.Now;
                query.comentarios = historicoMovimiento.comentarios;
                query.id_tipo_movimiento = historicoMovimiento.id_tipo_movimiento;
                query.id_inventario = historicoMovimiento.id_inventario;
                query.id_user = 1;
                context.SaveChanges();
                return Ok();
            }
        }
    }
}
