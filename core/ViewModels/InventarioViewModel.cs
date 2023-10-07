using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class InventarioViewModel{

 
        public string id_inventario { get; set; }
      
        public int? id_producto { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; }
     
        public int id_bodega { get; set; }
    
        public int id_inventario_estado { get; set; }
   
        public string user { get; set; }

    }
}