using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels{
    public class MovimientoTipoViewModel{

        public int id_movimiento_tipo { get; set; }

        public string nombre_movimiento_tipo { get; set; }
        public DateTime fecha_creacion { get; set; } = DateTime.Now;
        public DateTime fecha_actualizacion { get; set; } = DateTime.Now;
    }
}