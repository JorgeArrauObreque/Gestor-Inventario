using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace gestion_inventario.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        [HttpGet]
        public dynamic[] Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.productos.Include(r => r.ProveedorNavigation).Include(r=>r.categoriaNavigation).Include(r=>r.tipoProductoNavigation)
                    .Select(r=> new {id_producto = r.id_producto,nombre_producto = r.nombre_producto
                    ,fecha_creacion = r.fecha_creacion,fecha_actualizacion = r.fecha_actualizacion,proveedor = r.ProveedorNavigation.nombre_proveedor
                    ,marca=r.marca,descripcion = r.descripcion,categoria = r.categoriaNavigation.nombre_categoria, 
                        tipo_producto = r.tipoProductoNavigation.nombre_tipo_producto, id_proveedor=r.id_proveedor, id_categoria = r.id_categoria,id_tipo_producto=r.id_tipo_producto  })
                    .ToArray(); 
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
        [HttpPost]
        public ActionResult Add([FromBody]ProductoViewModel producto)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.productos.Where(r=>r.id_producto == producto.id_producto).FirstOrDefault();
                if(query != null ) return BadRequest();
                Producto new_producto = new Producto();
                new_producto.id_producto = producto.id_producto;
                new_producto.id_proveedor = producto.id_proveedor;
                new_producto.nombre_producto = producto.nombre_producto;
                new_producto.fecha_creacion = DateTime.Now;
                new_producto.id_tipo_producto = producto.id_tipo_producto;
                new_producto.descripcion = producto.descripcion;
                new_producto.fecha_actualizacion = DateTime.Now;
                new_producto.id_categoria = producto.id_categoria;
                new_producto.marca = producto.marca;
                context.productos.Add(new_producto);
                context.SaveChanges();
                return Ok();
            }
            
        }
        [HttpPut]
        public ActionResult Update([FromBody] ProductoViewModel producto){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.productos.Where(r=>r.id_producto == producto.id_producto).FirstOrDefault();
                if(query == null ) return NotFound();
                query.id_proveedor = producto.id_proveedor;
                query.fecha_creacion = DateTime.Now;
                query.descripcion = producto.descripcion;
                query.fecha_actualizacion = DateTime.Now;
                query.nombre_producto = producto.nombre_producto;
                query.id_categoria = producto.id_categoria;
                query.id_producto = producto.id_producto;
                query.id_tipo_producto = producto.id_tipo_producto;
                query.marca = producto.marca;
                context.SaveChanges();
                return Ok();

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
