using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class ProductoViewModel{

        public string id_producto { get; set; }
 
        public string nombre_producto { get; set; }

        public string id_proveedor { get; set; }
 
        public string marca { get; set; }
 
        public string descripcion { get; set; }

        public string id_categoria { get; set; }
   
        public string id_tipo_producto { get; set; }
    
    }
}