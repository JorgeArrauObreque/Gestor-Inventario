﻿using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.Formula.Functions;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventarioController : ControllerBase
    {
        [HttpGet]
        public dynamic[] Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.inventario.Include(r => r.InventarioEstadoNavigation).Include(r => r.bodegaNavigation).Include(r => r.productoNavigation)
                    .Select(r => new { id_inventario = r.id_inventario, id_bodega = r.id_bodega, id_inventario_estado = r.id_inventario_estado,
                        nombre_bodega = r.bodegaNavigation.direccion, nombre_inventario_estado = r.InventarioEstadoNavigation.nombre_estado_inventario,
                        nombre_producto = r.productoNavigation.nombre_producto, id_producto = r.id_producto,fecha_actualizacion = r.fecha_actualizacion,
                        fecha_creacion=r.fecha_creacion, marca = r.productoNavigation.marca   }).OrderBy(r=>r.id_inventario).ToArray();
            }
        }
        [HttpGet("withoutStock")]
        public dynamic WithoutStock()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = (
                             from producto in context.productos.Include(r=>r.inventarios)
                             join categoria in context.categorias on producto.id_categoria equals categoria.id_categoria
                            where producto.inventarios.Count() <5
                            orderby producto.inventarios.Count descending
                            select new { producto = producto, stock = producto.inventarios.Count, categoria = categoria.nombre_categoria}).ToList();
                return (query);
            }
        }


        [HttpGet("api/inventario/get_by_id")]
        public Inventario Get_by_id(string id_inventario)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.inventario.Where(r => r.id_inventario == id_inventario).FirstOrDefault();
            }
        }
        [HttpDelete("{id_inventario}")]
        public ActionResult Delete(string id_inventario) {
            try
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query = context.inventario.Where(r => r.id_inventario == id_inventario).FirstOrDefault();
                    if (query == null) return NotFound();
                    context.inventario.Remove(query);
                    context.SaveChanges();
                    return Ok();
                }
            }
            catch (System.Exception e)
            {
                return BadRequest();
            }

        }
        [HttpGet("exists")]
        public ActionResult Exists(string id_inventario)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return Ok( new { resultado = context.inventario.Where(r => r.id_inventario == id_inventario).Any() , inventario = 
                    context.inventario.Include(r=>r.productoNavigation).Include(r=>r.productoNavigation.tipoProductoNavigation).Where(r => r.id_inventario == id_inventario)
                    .Select(r=> new {  id_producto = r.id_producto, id_inventario = r.id_inventario, nombre_producto = r.productoNavigation.nombre_producto, marca = r.productoNavigation.marca, 
                        tipo_producto = r.productoNavigation.tipoProductoNavigation.nombre_tipo_producto }).FirstOrDefault() }) ;
            }
        }
        [HttpPost]
        public ActionResult Add([FromBody] InventarioViewModel inventario){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.inventario.Where(r => r.id_inventario == inventario.id_inventario).FirstOrDefault();
                if (query != null) return NotFound("Ya existe el producto ingresado");
                Inventario new_inventario = new Inventario();
                new_inventario.id_inventario = inventario.id_inventario;
                new_inventario.id_inventario_estado = inventario.id_inventario_estado;
                new_inventario.id_bodega = inventario.id_bodega;
                new_inventario.id_producto = inventario.id_producto;
                new_inventario.fecha_creacion = DateTime.Now;
                new_inventario.fecha_actualizacion = DateTime.Now;
                new_inventario.user = "admin";
                context.inventario.Add(new_inventario);
                context.SaveChanges();

                //añadicion al historico
                HistoricoMovimiento historico = new HistoricoMovimiento();
                historico.id_tipo_movimiento = 3;
                historico.id_inventario = new_inventario.id_inventario;
                historico.id_user = 2;
                historico.comentarios = "Ingreso";
                historico.fecha_creacion = DateTime.Now;
                historico.fecha_actualizacion = DateTime.Now;
                context.Add(historico);
                context.SaveChanges();
                return Ok("Inventario Añadido Correctamente");
            }
        }
        [HttpPut]
        public ActionResult Update([FromBody] InventarioViewModel inventario){
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.inventario.Where(r=>r.id_inventario == inventario.id_inventario).FirstOrDefault();
                if (query == null) return NotFound();
                bool cambio_bodega = query.id_bodega != inventario.id_bodega; 
                query.id_inventario = inventario.id_inventario;
                query.id_inventario_estado = inventario.id_inventario_estado;
                query.id_bodega = inventario.id_bodega;
                query.user = "Admin";
                query.id_producto = inventario.id_producto;
                query.fecha_actualizacion = DateTime.Now;
                context.SaveChanges();
                if (cambio_bodega == true)
                {
                    HistoricoMovimiento historico = new HistoricoMovimiento();
                    historico.id_tipo_movimiento = 2;
                    historico.id_inventario = query.id_inventario;
                    historico.id_user = 2;
                    historico.comentarios = "cambio de bodega";
                    historico.fecha_creacion = DateTime.Now;
                    historico.fecha_actualizacion = DateTime.Now;
                    context.Add(historico);
                    context.SaveChanges();
                }
                return Ok();
            }
        }
        [HttpPost("registrarActivo")]
        public ActionResult RegistrarActivo([FromBody] RegistroActivo activo)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                if (activo.id_producto == "0")
                {
                    Producto producto = new Producto();
                    producto.id_producto = string.Concat(activo.marca.Substring(0, 1), " ", DateTime.Now.ToString("ddMMyyyyHHmmss"));
                    producto.marca = activo.marca;
                    producto.descripcion = activo.descripcion;
                    producto.id_proveedor = "1";
                    producto.nombre_producto = activo.nombre_producto;
                    producto.fecha_creacion = DateTime.Now;
                    producto.fecha_actualizacion = DateTime.Now;
                    producto.id_tipo_producto = activo.tipo_producto;
                    producto.id_categoria = "1";
                    context.Add(producto);
                    var query = context.inventario.Where(r => r.id_inventario == activo.id_inventario).FirstOrDefault();
                    if (query != null) return Ok("el activo ya existe");
                    Inventario new_inventario = new Inventario();
                    new_inventario.id_inventario = activo.id_inventario;
                    new_inventario.id_inventario_estado = "1";
                    new_inventario.id_bodega = "1";
                    new_inventario.id_producto = producto.id_producto;
                    new_inventario.fecha_creacion = DateTime.Now;
                    new_inventario.fecha_actualizacion = DateTime.Now;
                    new_inventario.user = "admin";
                    context.inventario.Add(new_inventario);
                    context.SaveChanges();
                    HistoricoMovimiento historico = new HistoricoMovimiento();
                    historico.id_tipo_movimiento = 3;
                    historico.id_inventario = new_inventario.id_inventario;
                    historico.id_user = 2;
                    historico.fecha_creacion = DateTime.Now;
                    historico.fecha_actualizacion = DateTime.Now;
                    historico.comentarios = "Ingreso";
                    context.Add(historico);
                    context.SaveChanges();
                }
                else
                {
           

                    var query = context.productos.Where(r => r.id_producto == activo.id_producto).FirstOrDefault();
                    var query_inventario = context.inventario.Where(r => r.id_inventario == activo.id_inventario).FirstOrDefault();
                    if (query_inventario != null) return Ok("el activo ya existe");
                    Inventario new_inventario = new Inventario();
                    new_inventario.id_inventario = activo.id_inventario;
                    new_inventario.id_inventario_estado = "1";
                    new_inventario.id_bodega = "1";
                    new_inventario.id_producto = activo.id_producto;
                    new_inventario.fecha_creacion = DateTime.Now;
                    new_inventario.fecha_actualizacion = DateTime.Now;
                    new_inventario.user = "admin";
                    context.inventario.Add(new_inventario);
                    context.SaveChanges();
                    HistoricoMovimiento historico = new HistoricoMovimiento();
                    historico.id_tipo_movimiento = 3;
                    historico.id_inventario = new_inventario.id_inventario;
                    historico.id_user = 2;
                    historico.comentarios = "Ingreso";
                    historico.fecha_creacion = DateTime.Now;
                    historico.fecha_actualizacion = DateTime.Now;
                    context.Add(historico);
                    context.SaveChanges();
                }
                return Ok("Activo ingresado correctame");
            }
        }
    }
}
