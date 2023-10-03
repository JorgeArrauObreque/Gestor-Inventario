using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class PrestamoViewModel{
       [Required]
        public long id_prestamo{ get; set; }
        [Required]
        public string user { get; set; }
        [Required]
        public string rut { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;
        
        public bool entregado { get; set; } = false;
        [Required]
        public DateTime fecha_plazo { get; set; } = DateTime.Now.AddDays(1);
    }
}