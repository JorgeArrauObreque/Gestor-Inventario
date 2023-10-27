using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class PrestamoViewModel{

        public long id_prestamo { get; set; }

        public string user { get; set; }

        public string rut { get; set; }
        
        public bool entregado { get; set; } = false;

        public DateTime fecha_plazo { get; set; } = DateTime.Now.AddDays(1);
    }
}