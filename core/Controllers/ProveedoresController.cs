using System.ComponentModel.DataAnnotations;
using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProveedoresController : ControllerBase
    {
        [HttpGet]
        public List<Proveedor> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.proveedores.ToList();
            }
        }
        [HttpGet("api/proveedor/get_by_id")]
        public Proveedor Get_by_id(string id_proveedor)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.proveedores.Where(r => r.id_proveedor == id_proveedor).FirstOrDefault();
            }
        }
        [HttpDelete("{id_proveedor}")]
        public ActionResult Delete(string id_proveedor){
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.proveedores.Where(r=>r.id_proveedor == id_proveedor).FirstOrDefault();
                    if (query == null)
                    {
                        return NotFound("proveedor no encontrado");
                    }  
                    context.Remove(query);
                    context.SaveChanges();
                    return Ok();
                } 
            }
            catch (System.Exception e )
            {
                
                return BadRequest();
            }
       
        }
        [HttpPost]
        public ActionResult Add([FromBody] ProveedorViewModel proveedor){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.proveedores.Where(r=>r.id_proveedor == proveedor.id_proveedor).FirstOrDefault();
                if (query != null) return BadRequest();
                Proveedor new_proveedor = new Proveedor();
                new_proveedor.id_proveedor = proveedor.id_proveedor;
                new_proveedor.nombre_proveedor = proveedor.nombre_proveedor;
                new_proveedor.fecha_creacion = DateTime.Now;
                new_proveedor.fecha_actualizacion = DateTime.Now;
                new_proveedor.correo = proveedor.correo;
                new_proveedor.telefono = proveedor.telefono;
                context.proveedores.Add(new_proveedor);
                context.SaveChanges();
                return Ok();
            }     
        }
        [HttpPut]
        public ActionResult Update([FromBody] ProveedorViewModel proveedor){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.proveedores.Where(r=>r.id_proveedor == proveedor.id_proveedor).FirstOrDefault();
                if (query == null) return NotFound();
                query.id_proveedor = proveedor.id_proveedor;
                query.nombre_proveedor = proveedor.nombre_proveedor;
                query.correo = proveedor.correo;
                query.telefono = proveedor.telefono;
    
                query.fecha_actualizacion = DateTime.Now;
                context.SaveChanges();
                return Ok();
            }
        }
    }
}
