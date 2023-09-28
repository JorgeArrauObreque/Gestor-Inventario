﻿using gestion_inventario.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoProductoController : ControllerBase
    {
        [HttpGet("api/tipoProducto/all")]
        public List<TipoProducto> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.tipos_producto.ToList();
            }
        }
        [HttpGet("api/tipoProducto/get_by_id")]
        public TipoProducto Get_by_id(int id_tipo_producto)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
               return context.tipos_producto.Where(r => r.id_tipo_producto == id_tipo_producto).FirstOrDefault();
            }
        }
    }
}
