using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class Persona{
        [Required]
        public long id_persona { get; set; }
        [Required]
        [MaxLength(15)]
        public string rut { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;
        [Required]
        [MaxLength(70)]
        public string nombres { get; set; }
        [Required]
        [MaxLength(70)]
        public string apellidos { get; set; }
        [Required]
        [MaxLength(70)]
        public string carrera { get; set; }
        [Required]
        [MaxLength(20)]
        public string genero { get; set; }
    }
}