namespace gestion_inventario.ViewModels
{
    public class PrestamoRequest
    {
        public string id_solicitante { get; set; }
        public string fecha_plazo { get; set; }
        public List<string> id_inventarios { get; set; }
    }
}
