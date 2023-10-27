using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoricoMovimientoController : ControllerBase
    {
        [HttpGet("api/historicoMovimiento/all")]
        public List<HistoricoMovimiento> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.historico_movimientos.ToList ();
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
