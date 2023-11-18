using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{

    public class BodegaViewModel{
        [Required]
        public int id_bodega { get; set; }
        [Required]
        [MaxLength(200)]
        public string direccion { get; set; }
    }


}