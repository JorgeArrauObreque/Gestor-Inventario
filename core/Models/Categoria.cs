using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gestion_inventario.Models
{
    [Table("Categoria")]
    public class Categoria
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_categoria { get; set; }
        [Required]
        [MaxLength(50)]
        [Column("varchar(50)")]
        public string nombre_categoria { get; set; }
        public DateTime fecha_creacion {get;set;} = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;

    }
}
