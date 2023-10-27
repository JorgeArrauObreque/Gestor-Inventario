﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gestion_inventario.Models
{
    public class HistoricoMovimiento
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_movimiento { get; set; }
        [Required]
        public int id_tipo_movimiento { get; set; }
        [NotMapped]
        public MovimientoTipo movimientoTipoNavigation { get; set; }
        [Required]
        public string id_inventario { get; set; }
      
        public Inventario inventarioNavigation { get; set; }
        [Required]
        [MaxLength(150)]
        [Column(TypeName = "varchar(150)")]
        public string comentarios { get; set; }
        public DateTime fecha_creacion { get; set; }
        public DateTime fecha_actualizacion { get; set; }
        public long id_user { get; set; }

        public Usuario usuarioNavegation { get; set; }
    }
}
