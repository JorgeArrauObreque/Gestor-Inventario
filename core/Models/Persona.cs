﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gestion_inventario.Models
{
    public class Persona
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id_alumno { get; set; }
        [Required]
        [MaxLength(15)]
        [Column(TypeName = "varchar(15)")]
        public string rut { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;
        [Required]
        [MaxLength(70)]
        [Column(TypeName = "varchar(70)")]
        public string nombres { get; set; }
        [Required]
        [MaxLength(70)]
        [Column(TypeName = "varchar(70)")]
        public string apellidos { get; set; }
        [Required]
        [MaxLength(70)]
        [Column(TypeName = "varchar(70)")]
        public string carrera { get; set; }
        [Required]
        [MaxLength(20)]
        [Column(TypeName = "varchar(20)")]
        public string genero { get; set; }
    }
}
