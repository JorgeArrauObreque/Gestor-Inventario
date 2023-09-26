
using Microsoft.EntityFrameworkCore;

namespace gestion_inventario.Models
{
    public class DbContextInventario:DbContext
    {
        public DbSet<Categoria> categorias { get; set; }
        public DbSet<TipoProducto> tipos_producto { get; set; }
        public DbSet<Bodega> bodegas { get; set; }
        public DbSet<HistoricoMovimiento> historico_movimientos { get; set; }
        public DbSet<Inventario> inventario { get; set; }
        public DbSet<InventarioEstado> inventario_estados { get; set; }
        public DbSet<MovimientoTipo> movimiento_tipos { get; set; }
        public DbSet<Persona> usuarios { get; set; }
        public DbSet<Prestamo> prestamos { get; set; }
        public DbSet<PrestamoDetalle> prestamo_detalles { get; set; }
        public DbSet<Producto> productos { get; set; }
        public DbSet<Proveedor> proveedores { get; set; }
        public DbContextInventario(DbContextOptions<DbContextInventario> options):base(options) { }
        public DbContextInventario() { }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var configuracion = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            options.UseSqlServer(configuracion.GetConnectionString("DefaultConnection"));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Producto>().HasOne(r => r.tipoProductoNavigation).WithMany(r => r.productos).HasForeignKey(r => r.id_tipo_producto);
            base.OnModelCreating(modelBuilder);
        }
    }
}
