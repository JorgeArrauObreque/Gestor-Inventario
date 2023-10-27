using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class InventarioViewModel{

 
        public string id_inventario { get; set; }
      
        public string id_producto { get; set; }

     
        public string id_bodega { get; set; }
    
        public string id_inventario_estado { get; set; }
   
        //public string user { get; set; }

    }
}