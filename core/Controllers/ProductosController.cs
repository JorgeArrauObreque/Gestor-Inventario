using gestion_inventario.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace gestion_inventario.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductosController : ControllerBase
    {
        [HttpGet("api/productos/all")]
        public Producto[] Index()
        {
            using (DbContextInventario context = new DbContextInventario())
            {

                return context.productos.Include(r => r.ProveedorNavigation).ToArray(); 
            }
        }
        [HttpGet("api/productos/get")]
        public Producto Get(int id_producto) 
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.productos.Where(r => r.id_producto == id_producto).FirstOrDefault();
            }
        }
        [HttpPost("api/productos/add_update")]
        public ActionResult Add_Update([FromBody][Bind("nombre_producto")]Producto producto)
        {
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    if (ModelState.IsValid)
                    {
                        var validacion = context.productos.Where(r => r.id_producto == producto.id_producto).FirstOrDefault();
                        if (validacion == null)
                        {
                            context.Add(producto);
                            context.SaveChanges();
                            return Ok();
                        }
                        else
                        {
                            validacion.id_proveedor = producto.id_proveedor;
                            validacion.id_categoria = producto.id_categoria;
                            validacion.marca = producto.marca;
                            validacion.fecha_actualizacion = DateTime.Now;
                            validacion.nombre_producto = producto.nombre_producto;
                            validacion.descripcion = producto.descripcion;
                            validacion.id_tipo_producto = producto.id_tipo_producto;
                            context.SaveChanges();
                            return Ok();
                        }
                    }
                    else
                    {
                        return BadRequest("el formato de los campos esta incorrecto intentelo nuevamente");
                    }
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpDelete]
        public ActionResult Productos(long id_producto){
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.productos.Where(r=>r.id_producto == id_producto).FirstOrDefault();
                    if (query == null) return NotFound();
                    context.productos.Remove(query);
                    return Ok();
                } 
            }
            catch (System.Exception e)
            {
                return BadRequest();
            }
      
        }
    }
}
