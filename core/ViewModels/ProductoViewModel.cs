using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class ProductoViewModel{

        public int id_producto { get; set; }
 
        public string nombre_producto { get; set; }

        public int? id_proveedor { get; set; }
 
        public string marca { get; set; }
 
        public string descripcion { get; set; }

        public int? id_categoria { get; set; }
   
        public int? id_tipo_producto { get; set; }
    
    }
}