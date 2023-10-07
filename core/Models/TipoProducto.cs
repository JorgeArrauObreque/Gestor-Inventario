using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gestion_inventario.Models
{
    public class TipoProducto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id_tipo_producto { get; set; }
        [Required]
        [MaxLength(30)]
        [Column(TypeName ="varchar(30)")]
        public string nombre_tipo_producto { get; set; }
        
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;
        public List<Producto> productos { get; set; }
    }
}
