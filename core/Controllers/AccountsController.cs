﻿using gestion_inventario.Migrations;
using gestion_inventario.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        [AllowAnonymous] // Este método está abierto para todos
        [HttpPost("login")]
        public IActionResult Login([FromBody] ApplicationUser user)
        {
         
            if (!IsValidUser(user))
            {
                return Unauthorized();
            }

            var token = GenerateToken(user.Username);

            return Ok(new { Token = token });
        }

        private string GenerateToken(string username)
        {
            var key = Encoding.ASCII.GetBytes("TuClaveSecretaLargaParaGenerarJWTDeAlMenos128Bits"); // Debe coincidir con la clave de configuración
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.Name, username),
        }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        public bool IsValidUser(ApplicationUser usuario)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                string password = new AESEncryption().Encrypt(usuario.PasswordHash);
                return context.usuariosSistema.Where(r => r.username == usuario.Username && usuario.PasswordHash == password).FirstOrDefault() != null ? true : false;
            }
        }
        public List<Usuario> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.usuariosSistema.ToList();
            }
        }
        [HttpPost]
        public ActionResult Add([FromBody] Usuario usuario)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                if (context.usuariosSistema.Where(r => r.id_user == usuario.id_user).FirstOrDefault()!=null) return BadRequest();
                var new_usuario = new Usuario();
                new_usuario.id_user = usuario.id_user;
                new_usuario.email = usuario.email;
                new_usuario.username = usuario.username;
                new_usuario.id_rol = usuario.id_rol;
                new_usuario.password = new AESEncryption().Encrypt(usuario.password);
                context.Add(new_usuario);
                context.SaveChanges();
                return Ok("Creado correctamente");
            }
        }
        [HttpPut]
        public ActionResult Update([FromBody] Usuario usuario)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.usuariosSistema.Where(r => r.id_user == usuario.id_user).FirstOrDefault();
                if (query == null) return NotFound();
                query.email = usuario.email;
                query.username = usuario.username;
                query.id_rol = usuario.id_rol;
                query.fecha_actualizacion = DateTime.Now;
                context.SaveChanges();
                return Ok("Creado correctamente");
            }
        }
        [HttpPost("addrol")]
        public ActionResult AddRol([FromBody] Rol rol)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.roles.Where(r => r.id_rol == rol.id_rol).FirstOrDefault();
                if (query != null) return BadRequest();
                Rol new_rol = new Rol();
                new_rol.nombre_rol = rol.nombre_rol;
                context.Add(new_rol);
                context.SaveChanges();
                return Ok("Creado correctamente");
            }
        }
        [HttpPut("editrol")]
        public ActionResult EditRol([FromBody] Rol rol)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var query = context.roles.Where(r => r.id_rol == rol.id_rol).FirstOrDefault();
                if (query == null) return BadRequest();

                query.nombre_rol = rol.nombre_rol;
                query.fecha_actualizacion = DateTime.Now;
                context.SaveChanges();
                return Ok("Creado correctamente");
            }
        }
    }
}
