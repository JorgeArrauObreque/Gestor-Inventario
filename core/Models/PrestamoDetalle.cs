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
        public long id_inventario { get; set; }
        [NotMapped]
        public Inventario inventarioNavigation { get; set; }
        [Required]
        public long id_prestamo { get; set; }
        [NotMapped]
        public Prestamo prestamoNavigation { get; set; }
        
    }
}
