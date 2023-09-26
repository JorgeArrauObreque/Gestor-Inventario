using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace gestion_inventario.Models
{
    public class Producto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_producto { get; set; }
        [Required]
        [MaxLength(50)]
        [NotNull]
        [Column(TypeName ="varchar(50)")]
        public string nombre_producto { get; set; }
        public DateTime fecha_creacion { get; set; }
        public DateTime fecha_actualizacion { get; set; }
        [Required]
        [NotNull]
        public int? id_proveedor { get; set; }
        [NotMapped]
        public Proveedor ProveedorNavigation { get; set; }
        [Required]
        [MaxLength(90)]
        [NotNull]
        [Column(TypeName = "varchar(90)")]
        public string marca { get; set; }
        [Required]
        [MaxLength(300)]
        [NotNull]
        [Column(TypeName = "varchar(300)")]
        public string descripcion { get; set; }
        [Required]
        [NotNull]
        public int? id_categoria { get; set; }
        [NotMapped]
        public Categoria categoriaNavigation { get; set; }
        [Required]
        [NotNull]
        public int? id_tipo_producto { get; set; }
        [NotMapped]
        public TipoProducto tipoProductoNavigation { get; set; }
        public List<Inventario> inventarios { get; set; }

    }
}
