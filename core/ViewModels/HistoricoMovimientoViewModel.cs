using gestion_inventario.Models;
using System.ComponentModel.DataAnnotations;
namespace gestion_inventario.ViewModels{
    public class HistoricoMovimientoViewModel{
   
        [Required]
        public int id_movimiento { get; set; }
        [Required]
        public int id_tipo_movimiento { get; set; }
        [Required]
        public int id_inventario { get; set; }
        [Required]
        [MaxLength(150)]
        public string comentarios { get; set; }
        public DateTime fecha_creacion { get; set; }
        public DateTime fecha_actualizacion { get; set; }
        public string id_user { get; set; }
    }
}