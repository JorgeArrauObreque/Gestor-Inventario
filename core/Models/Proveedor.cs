using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gestion_inventario.Models
{
    public class Proveedor
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_proveedor { get; set; }
        [Required]
        [MaxLength(50)]
        [Column(TypeName = "varchar(50)")]
        public string nombre_proveedor { get; set; }
        [Required]
        [EmailAddress]
        [Column(TypeName ="varchar(90)")]
        public string correo { get; set; }
        [Required]
        //[Phone]
        [Column(TypeName = "varchar(15)")]
        public string telefono { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;
        public List<Producto> productos { get; set; }
    }
}
