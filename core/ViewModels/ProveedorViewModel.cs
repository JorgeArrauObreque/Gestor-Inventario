using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class ProveedorViewModel{
  
        public int id_proveedor { get; set; }
   
        public string nombre_proveedor { get; set; }
  
        public string correo { get; set; }
  
        public string telefono { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;
    }
}