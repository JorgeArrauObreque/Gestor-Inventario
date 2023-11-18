using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace gestion_inventario.Models
{
    public class Producto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string id_producto { get; set; }
        [Required]
        [MaxLength(50)]
        [NotNull]
        [Column(TypeName ="varchar(50)")]
        public string nombre_producto { get; set; }
        [IgnoreDataMember]
        public DateTime fecha_creacion { get; set; }
        public DateTime fecha_actualizacion { get; set; }
        [Required]
        [NotNull]
        public string id_proveedor { get; set; }
        [NotMapped]
        [IgnoreDataMember]
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
        public string id_categoria { get; set; }
        [NotMapped]
        [IgnoreDataMember]
        public Categoria categoriaNavigation { get; set; }
        [Required]
        [NotNull]
        public string id_tipo_producto { get; set; }
        [NotMapped]
        [IgnoreDataMember]
        public TipoProducto tipoProductoNavigation { get; set; }
        [IgnoreDataMember]
        public List<Inventario> inventarios { get; set; }

    }
}
