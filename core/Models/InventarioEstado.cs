using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace gestion_inventario.Models
{
    public class InventarioEstado
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_inventario_estado { get; set; }
        [Required]
        [NotNull]
        [MaxLength(50)]
        [Column(TypeName = "varchar(50)")]
        public string nombre_estado_inventario { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;
    }
}
