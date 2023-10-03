using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class TipoProductoViewModel{
        [Required]
        public int id_tipo_producto { get; set; }
        [Required]
        [MaxLength(30)]
        public string nombre_tipo_producto { get; set; }
        
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;
    }
}