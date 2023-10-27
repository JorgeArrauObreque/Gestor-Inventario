using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gestion_inventario.Models
{
    public class Bodega
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string id_bodega { get; set; }
        [MaxLength(200)]
        [Column(TypeName = "varchar(200)")]
        public string nombre_bodega { get; set; }
        [Required]
        [MaxLength(200)]
        [Column(TypeName = "varchar(200)")]
        public string direccion { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;
        public List<Inventario> inventarios { get; set; }
    }
}
