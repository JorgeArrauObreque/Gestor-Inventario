using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels
{
    public class InventarioEstadoViewModel
    {
         [Required]
        public int id_inventario_estado { get; set; }
        [Required]

        [MaxLength(50)]
        public string nombre_estado_inventario { get; set; }
    }
}