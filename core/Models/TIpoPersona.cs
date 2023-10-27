using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gestion_inventario.Models
{
    public class TipoPersona
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id_tipo_persona { get; set; }
        [Required]
       
        [Column(TypeName="varchar(50)")]

        public string nombre_tipo_persona { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;
        [NotMapped]
        public List<Persona> personas { get; set; }
    }
}
