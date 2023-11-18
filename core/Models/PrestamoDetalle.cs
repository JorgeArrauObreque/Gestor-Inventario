using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gestion_inventario.Models
{
    public class PrestamoDetalle
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id_prestamo_detalle { get; set; }
        [Required]
        public string id_inventario { get; set; }
        [NotMapped]
        public Inventario inventarioNavigation { get; set; }
        [Required]
        public long id_prestamo { get; set; }
<<<<<<< HEAD
        
        public Prestamo prestamoNavigation { get; set; }
        public DateTime? fecha_entrega { get; set; }
        [Required]
        public bool entregado { get; set; } = false;

=======
        [NotMapped]
        public Prestamo prestamoNavigation { get; set; }
        
>>>>>>> main
    }
}
