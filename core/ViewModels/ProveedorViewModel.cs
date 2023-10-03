using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class ProveedorViewModel{
        [Required]
        public int id_proveedor { get; set; }
        [Required]
        [MaxLength(50)]
        public string nombre_proveedor { get; set; }
        [Required]
        [EmailAddress]
        public string correo { get; set; }
        [Required]
        public string telefono { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;
    }
}