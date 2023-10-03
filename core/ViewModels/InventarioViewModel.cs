using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class InventarioViewModel{

        [Required]
        public long id_inventario { get; set; }
        [Required]
        public int? id_producto { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; }
        [Required]
        public int id_bodega { get; set; }
        [Required]
        public int id_inventario_estado { get; set; }
        [Required]
        public string user { get; set; }

    }
}