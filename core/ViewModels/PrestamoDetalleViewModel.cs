using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class PrestamoDetalleViewModel{

        public long id_prestamo_detalle { get; set; }

        public string id_inventario { get; set; }
  
        public long id_prestamo { get; set; }
    }
}