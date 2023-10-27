using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace gestion_inventario.Models
{
    public class Inventario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string id_inventario { get; set; }
        [Required]
        [NotNull]
        public string id_producto { get; set; }
        [NotMapped]
        public Producto productoNavigation { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; }
        [Required]
        public string id_bodega { get; set; }
        [NotMapped]
        public Bodega bodegaNavigation { get; set; }
        [Required]
        public string id_inventario_estado { get; set; }
        [NotMapped]
        public InventarioEstado InventarioEstadoNavigation { get; set; }
        public string user { get; set; }

        public List<PrestamoDetalle> prestamos_detalle { get; set; }
        public List<HistoricoMovimiento> historicos { get; set; }

    }
}
