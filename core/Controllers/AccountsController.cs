
using Azure.Messaging;
using gestion_inventario.Models;
using gestion_inventario.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Net;
using System.Net.Mail;
using OfficeOpenXml.FormulaParsing.LexicalAnalysis;

namespace gestion_inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("all")]
    public class AccountsController : ControllerBase
    {
        [AllowAnonymous] // Este método está abierto para todos
        [HttpPost("login")]
        public IActionResult Login([FromBody] ApplicationUser user)
        {
            bool resultado = IsValidUser(user);
            if (!resultado)
            {
                return Unauthorized( "Usuario No existente");
            }
            else
            {
                var token = GenerateToken(user.Username);

                return Ok(new { Token = token, user = GetUsuario(user.Username) });
            }
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
                
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        public Usuario GetUsuario(string user) {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.usuariosSistema.Include(r=>r.rolNavigation).Where(r => r.username == user).FirstOrDefault();
            }
        }
        public bool IsValidUser(ApplicationUser usuario)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
               
                return context.usuariosSistema.Where(r => r.username == usuario.Username && r.password == usuario.PasswordHash).Any();
            }
        }
        [HttpGet("all_users")]
        public List<Usuario> Get_all()
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                return context.usuariosSistema.Include(r=>r.rolNavigation).OrderBy(r=>r.id_user).ToList();
            }
        }
        [AllowAnonymous]
        [HttpGet("RecoverPassword")]
        public ActionResult RecoverPassword([FromQuery] string correo_electronico)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                if (context.usuariosSistema.Where(r=>r.email == correo_electronico.Trim()).Any())
                {
                    string smtpServer = "smtp.office365.com"; // o smtp-mail.outlook.com según corresponda
                    int smtpPort = 587; // Puedes cambiar a 465 si prefieres SSL/TLS
                    string smtpUsername = "testingdata97@outlook.com"; // Tu dirección de correo Outlook
                    string smtpPassword = "duoc2023"; // La contraseña de tu cuenta Outlook

                    // Configura el cliente SMTP
                    SmtpClient smtpClient = new SmtpClient(smtpServer);
                    smtpClient.Port = smtpPort;
                    smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
                    smtpClient.EnableSsl = true; // Usar SSL para Gmail

                    // Crea el mensaje de correo
                    Guid uniqueCode = Guid.NewGuid();
                    string uniqueCodeString = uniqueCode.ToString();

                    MailMessage correo = new MailMessage();
                    correo.From = new MailAddress("testingdata97@outlook.com");
                    correo.To.Add("jor.arrau@duocuc.cl");
                    correo.Subject = "Recuperación de contraseña";
                    // Crea el cuerpo del correo con un enlace
                    string linkRecuperar = $"http://localhost:3000/NewPassword?token={uniqueCode}"; // Cambia esto al enlace correcto
                    string cuerpoCorreo = "Para recuperar la contraseña, haga clic en el siguiente enlace: " + linkRecuperar;

                    correo.Body = cuerpoCorreo;

                    try
                    {
                        // Envía el correo
                        smtpClient.Send(correo);
                        using (DbContextInventario db = new DbContextInventario())
                        {
                            PasswordToken token = new PasswordToken();
                            token.id_usuario = correo_electronico;
                            token.token = uniqueCodeString;
                            token.fecha_creacion = DateTime.Now;
                            db.Add(token);
                            db.SaveChanges();
                        }
                    
                        Console.WriteLine("Correo enviado con éxito.");
                        return Ok();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Error al enviar el correo: " + ex.Message);
                        return BadRequest(ex.Message);
                    }

                }
                else
                {
                    return NotFound();
                }
            }
        }

        [AllowAnonymous]
        [HttpGet("validateToken")]
        public bool ValidateToken(string token)
        {
            using (DbContextInventario context = new DbContextInventario())
            {
                var resultado = context.passwordtokens.Where(r => r.token == token).FirstOrDefault();
                if (resultado.usado == true)
                {
                    return false;
                }
                if (resultado == null)
                {
                    return false;
                }
                else
                {
                    var fecha_limite = resultado.fecha_creacion.AddHours(2);
                    if (DateTime.Now > fecha_limite)
                    {
                        return false;
                    }
                    return true;
                }
            }
        }
        [AllowAnonymous]
        [HttpPost("changePassword")]
        public ActionResult ChangePassword([FromBody] PasswordRecovery password_recovery)
        {
            if (password_recovery.password == password_recovery.password_confirm)
            {
                using (DbContextInventario context = new DbContextInventario())
                {
                    var query_token = context.passwordtokens.Where(r => r.token == password_recovery.token).FirstOrDefault();
                    if (query_token.usado == true)
                    {
                        return BadRequest();
                    }
                    var usuario = context.usuariosSistema.Where(r => r.email == query_token.id_usuario).FirstOrDefault();
                    usuario.password = password_recovery.password;
                    query_token.usado = true;
                    context.SaveChanges();
                    return Ok();
                }
            }
            else
            {
                return BadRequest();
            }
      
        }
        //[HttpPost("add")]
        //[Authorize]
        //public ActionResult Add([FromBody] UsuariosViewModel usuario)
        //{
        //    using (DbContextInventario context = new DbContextInventario())
        //    {
        //        if (context.usuariosSistema.Where(r => r.id_user == usuario.id_user).FirstOrDefault()!=null) return BadRequest();
        //        var new_usuario = new Usuario();
        //        new_usuario.id_user = usuario.id_user;
        //        new_usuario.email = usuario.email;
        //        new_usuario.username = usuario.username;
        //        new_usuario.id_rol = usuario.id_rol;
        //        new_usuario.password =  usuario.password;
        //        context.Add(new_usuario);
        //        context.SaveChanges();
        //        return Ok("Creado correctamente");
        //    }
        //}
        //[HttpPut]
        //public ActionResult Update([FromBody] UsuariosViewModel usuario)
        //{
        //    using (DbContextInventario context = new DbContextInventario())
        //    {
        //        var query = context.usuariosSistema.Where(r => r.id_user ==  usuario.id_user).FirstOrDefault();
        //        if (query == null) return NotFound();
        //        query.email = usuario.email;
        //        query.username = usuario.username;
        //        query.id_rol = usuario.id_rol;
        //        query.fecha_actualizacion = DateTime.Now;
        //        context.SaveChanges();
        //        return Ok("Creado correctamente");
        //    }
        //}
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
