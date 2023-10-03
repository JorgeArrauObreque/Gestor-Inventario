using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class MovimientoTipoViewModel{
        [Required]
        public int id_movimiento_tipo { get; set; }
        [Required]
        [MaxLength(50)]
        public string nombre_movimiento_tipo { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;
    }
}