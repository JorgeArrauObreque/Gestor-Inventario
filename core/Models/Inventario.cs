using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace gestion_inventario.Models
{
    public class Inventario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id_inventario { get; set; }
        [Required]
        [NotNull]
        public int? id_producto { get; set; }
        [NotMapped]
        public Producto productoNavigation { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; }
        [Required]
        public int id_bodega { get; set; }
        [NotMapped]
        public Bodega bodegaNavigation { get; set; }
        [Required]
        public int id_inventario_estado { get; set; }
        [NotMapped]
        public InventarioEstado InventarioEstadoNavigation { get; set; }
        public string user { get; set; }

    }
}
