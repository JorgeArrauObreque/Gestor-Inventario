
using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.Models
{
    public class PasswordToken
    {
        [Key]
        public long id_token_password { get; set; }
        [Required]
        public string id_usuario { get; set; }
        [Required]
        public string token { get; set; }
        public DateTime fecha_creacion { get; set; }
    }
}
