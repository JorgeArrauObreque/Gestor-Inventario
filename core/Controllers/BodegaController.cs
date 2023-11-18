using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
<<<<<<< HEAD
    [Authorize]
=======

>>>>>>> main
    public class BodegaController : ControllerBase
    {
        [HttpGet]
        public List<Bodega> Get_All()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
<<<<<<< HEAD
                int result;
                return context.bodegas.ToList().OrderBy(r => {
                    if (int.TryParse(r.id_bodega, out int result))
                    {
                        return result;
                    }
                    else
                    {
                        return int.MaxValue;
                    }
                }).ToList();



            }
        }
        [HttpGet("get_by_id")]
=======
                return context.bodegas.ToList();
            }
        }
        [HttpGet("api/bodega/get_by_id")]
>>>>>>> main
        public Bodega Get_by_id(string id)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.bodegas.Where(r => r.id_bodega == id).FirstOrDefault();
            }
        }
        [HttpDelete("{id_bodega}")]
        public ActionResult Delete(string id_bodega){
<<<<<<< HEAD
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.bodegas.Where(r => r.id_bodega == id_bodega).FirstOrDefault();
                    if (query == null) return NotFound();
                    context.bodegas.Remove(query);
                    context.SaveChanges();
                    return Ok();
                }
            }
            catch (Exception e)
            {

                return BadRequest();
            }
  
=======
            using (DbContextInventario context = new DbContextInventario())
            {
                var query =context.bodegas.Where(r=>r.id_bodega == id_bodega).FirstOrDefault();
                if (query == null) return NotFound();
                context.bodegas.Remove(query);
                context.SaveChanges();
                return Ok();
            }
>>>>>>> main
        }
        [HttpPut]
        public ActionResult Update([FromBody]BodegaViewModel bodega){
            using (DbContextInventario context = new DbContextInventario())
            {
                if (ModelState.IsValid)
                {
                    var query = context.bodegas.Where(r=>r.id_bodega == bodega.id_bodega).FirstOrDefault();
                    if (query == null) return NotFound();
                    query.nombre_bodega = bodega.nombre_bodega;
                    query.id_bodega = bodega.id_bodega;
                    query.direccion = bodega.direccion;
                    query.fecha_actualizacion = DateTime.Now;
                    context.SaveChanges();
                    return Ok();
                }else{
                    return BadRequest();
                }
            }
        }
        [HttpPost]
        public ActionResult Add([FromBody]BodegaViewModel bodega){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.bodegas.Where(r=>r.id_bodega == bodega.id_bodega).FirstOrDefault();
                if (query != null) return BadRequest();
                Bodega new_bodega = new Bodega();
                new_bodega.id_bodega = bodega.id_bodega;
                new_bodega.nombre_bodega = bodega.nombre_bodega;
                new_bodega.direccion = bodega.direccion;
                new_bodega.fecha_creacion = DateTime.Now;
                new_bodega.fecha_actualizacion = DateTime.Now;
                context.bodegas.Add(new_bodega);
                context.SaveChanges();
                return Ok();
            }   
        }
    }
}
