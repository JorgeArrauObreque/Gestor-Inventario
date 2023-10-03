using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class PrestamoDetalleViewModel{
        [Required]
        public long id_prestamo_detalle { get; set; }
        [Required]
        public long id_inventario { get; set; }
        [Required]
        public long id_prestamo { get; set; }
    }
}