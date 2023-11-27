using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Http.HttpResults;
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
                return context.productos.Include(r => r.ProveedorNavigation).Include(r => r.categoriaNavigation).Include(r => r.tipoProductoNavigation)
                    .Select(r => new { id_producto = r.id_producto, nombre_producto = r.nombre_producto
                    , fecha_creacion = r.fecha_creacion, fecha_actualizacion = r.fecha_actualizacion, proveedor = r.ProveedorNavigation.nombre_proveedor
                    , marca = r.marca, descripcion = r.descripcion, categoria = r.categoriaNavigation.nombre_categoria,
                        tipo_producto = r.tipoProductoNavigation.nombre_tipo_producto, id_proveedor = r.id_proveedor, id_categoria = r.id_categoria, 
                        id_tipo_producto = r.id_tipo_producto }).ToList().OrderBy(r => {
                            if (int.TryParse(r.id_producto, out int result))
                            {
                                return result;
                            }
                            else
                            {
                                return int.MaxValue;
                            }
                        }).ToArray();
            }
        }
        [HttpGet("get")]
        public Producto Get(string id_producto)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.productos.Where(r => r.id_producto == id_producto).FirstOrDefault();
            }
        }
        [HttpPost]
        public ActionResult Add([FromBody] ProductoViewModel producto)
        {
            using (DbContextInventario context = new DbContextInventario())
            {

                string id_aux ="";
                var query = context.productos.Where(r => r.id_producto == producto.id_producto).FirstOrDefault();
                if (query != null || producto.id_producto == "0") id_aux = producto.nombre_producto.Substring(0, 1) + DateTime.Now.ToString("ddMMyyyymmss");
                var validacion_nombre_marca = context.productos.Where(r => r.nombre_producto == producto.nombre_producto && r.marca == producto.marca  ).FirstOrDefault();
                if (validacion_nombre_marca != null) return Accepted(new { mensaje = "ya existe un producto con la marca y el nombre ingresado, producto no creado" });
                Producto new_producto = new Producto();
                new_producto.id_producto = producto.id_producto == "0"? id_aux:producto.id_producto;
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
                return Ok(new { mensaje = "Producto añadido correctamente" , id_producto = new_producto.id_producto });
            }

        }
        [HttpPut]
        public ActionResult Update([FromBody] ProductoViewModel producto) {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.productos.Where(r => r.id_producto == producto.id_producto).FirstOrDefault();
                if (query == null) return NotFound();

                var validacion_nombre_marca = context.productos.Where(r => r.nombre_producto == producto.nombre_producto && r.marca == producto.marca).FirstOrDefault();
                if (validacion_nombre_marca != null) return BadRequest();


                query.id_proveedor = producto.id_proveedor;
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
        [HttpDelete("{id_producto}")]
        public ActionResult Delete(string id_producto){
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.productos.Where(r=>r.id_producto == id_producto).FirstOrDefault();
                    if (query == null) return NotFound();
                    context.productos.Remove(query);
                    context.SaveChanges();
                    return Ok();
                } 
            }
            catch (System.Exception e)
            {
                return BadRequest();
            }
      
        }
        [HttpGet("get_stock")]
        public dynamic Stock()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var idBodega = "1"; // Aquí se define el ID de la bodega que quieres filtrar

                var query = context.productos
         .Include(r => r.inventarios)
         .Include(r => r.categoriaNavigation)
         .Include(r => r.ProveedorNavigation)
         .Where(r => r.inventarios.Count == 0 || r.inventarios.All(inv => inv.id_bodega != idBodega) || r.inventarios.Count > 0)
         .Select(r => new
         {
             nombre_producto = r.nombre_producto,
             stock = r.inventarios.Count,
             marca = r.marca,
             categoria = r.categoriaNavigation.nombre_categoria,
             proveedor = r.ProveedorNavigation.nombre_proveedor
         })
         .OrderBy(r => r.nombre_producto)
         .ToList();

                return query;

            }
        }
    }
}
