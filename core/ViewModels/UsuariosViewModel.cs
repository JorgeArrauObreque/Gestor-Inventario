using gestion_inventario.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace gestion_inventario.ViewModels
{
    public class UsuariosViewModel
    {

        public string id_user { get; set; }
    
        public string username { get; set; }

        public string email { get; set; }

  

    
        public string id_rol { get; set; }

    }
}
