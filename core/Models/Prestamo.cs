﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gestion_inventario.Models
{
    public class Prestamo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id_prestamo{ get; set; }
        public long id_user { get; set; }
        public Usuario userNavegation { get; set; }
        public string rut { get; set; }
        [NotMapped]
        public Persona personaNavigation { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;
        public bool entregado { get; set; } = false;
        public DateTime fecha_plazo { get; set; } = DateTime.Now.AddDays(1);
        
        public List<PrestamoDetalle> prestamo_detalles { get; set; }
    }
}
