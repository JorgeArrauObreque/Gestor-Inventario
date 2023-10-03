using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class ProductoViewModel{
        [Required]
        public int id_producto { get; set; }
        [Required]
        [MaxLength(50)]
        public string nombre_producto { get; set; }
        public DateTime fecha_creacion { get; set; }
        public DateTime fecha_actualizacion { get; set; }
        [Required]
        public int? id_proveedor { get; set; }
        [Required]
        [MaxLength(90)]
        public string marca { get; set; }
        [Required]
        [MaxLength(300)]
        public string descripcion { get; set; }
        [Required]
        public int? id_categoria { get; set; }
   
        [Required]
        public int? id_tipo_producto { get; set; }
    
    }
}