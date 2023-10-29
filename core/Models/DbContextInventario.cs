
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace gestion_inventario.Models
{
    public class DbContextInventario : DbContext
    {
        public DbSet<Categoria> categorias { get; set; }
        public DbSet<TipoProducto> tipos_producto { get; set; }
        public DbSet<Bodega> bodegas { get; set; }
        public DbSet<HistoricoMovimiento> historico_movimientos { get; set; }
        public DbSet<Inventario> inventario { get; set; }
        public DbSet<InventarioEstado> inventario_estados { get; set; }
        public DbSet<MovimientoTipo> movimiento_tipos { get; set; }
        public DbSet<TipoPersona> tipos_personas { get; set; }
        public DbSet<Persona> usuarios { get; set; }
        public DbSet<Prestamo> prestamos { get; set; }
        public DbSet<PrestamoDetalle> prestamo_detalles { get; set; }
        public DbSet<Producto> productos { get; set; }
        public DbSet<Proveedor> proveedores { get; set; }
        public DbSet<Persona> personas { get; set; }
        public DbSet<Usuario> usuariosSistema { get; set; }
        public DbSet<Rol> roles { get; set; }
        public DbSet<PasswordToken> passwordtokens { get; set; }
        public DbContextInventario(DbContextOptions<DbContextInventario> options):base(options) { }
        public DbContextInventario() { }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var configuracion = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            options.UseSqlServer(configuracion.GetConnectionString("DefaultConnection"));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Producto>().HasOne(r => r.tipoProductoNavigation).WithMany(r => r.productos).HasForeignKey(r => r.id_tipo_producto).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Producto>().HasOne(r => r.categoriaNavigation).WithMany(r => r.productos).HasForeignKey(r => r.id_categoria).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Producto>().HasOne(r => r.ProveedorNavigation).WithMany(r => r.productos).HasForeignKey(r=>r.id_proveedor).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Inventario>().HasOne(r => r.bodegaNavigation).WithMany(r => r.inventarios).HasForeignKey(r => r.id_bodega).OnDelete(DeleteBehavior.Restrict); 
            modelBuilder.Entity<Inventario>().HasOne(r => r.InventarioEstadoNavigation).WithMany(r => r.inventarios).HasForeignKey(r=>r.id_inventario_estado).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Inventario>().HasOne(r => r.productoNavigation).WithMany(r => r.inventarios).HasForeignKey(r => r.id_producto).OnDelete(DeleteBehavior.Restrict); 
            modelBuilder.Entity<PrestamoDetalle>().HasOne(r => r.prestamoNavigation).WithMany(r => r.prestamo_detalles).HasForeignKey(r => r.id_prestamo).OnDelete(DeleteBehavior.Restrict); 
            modelBuilder.Entity<HistoricoMovimiento>().HasOne(r => r.movimientoTipoNavigation).WithMany(r => r.historicos).HasForeignKey(r => r.id_tipo_movimiento).OnDelete(DeleteBehavior.Restrict); ;
            modelBuilder.Entity<Prestamo>().HasOne(r => r.personaNavigation).WithMany(r => r.prestamos).HasForeignKey(r => r.rut).OnDelete(DeleteBehavior.Restrict); ;
            modelBuilder.Entity<Usuario>().HasOne(r => r.rolNavigation).WithMany(r => r.Usuarios).HasForeignKey(r => r.id_rol).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Persona>().HasOne(r => r.TipoPersonaNavegation).WithMany(r => r.personas).HasForeignKey(r => r.id_tipo_persona).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<PrestamoDetalle>().HasOne(r => r.inventarioNavigation).WithMany(r => r.prestamos_detalle).HasForeignKey(r => r.id_inventario).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<HistoricoMovimiento>().HasOne(r => r.inventarioNavigation).WithMany(r => r.historicos).HasForeignKey(r => r.id_inventario).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Prestamo>().HasOne(r=>r.userNavegation).WithMany(r=>r.prestamos).HasForeignKey(r=>r.id_user).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<HistoricoMovimiento>().HasOne(r => r.usuarioNavegation).WithMany(r => r.historicos).HasForeignKey(r => r.id_user).OnDelete(DeleteBehavior.Restrict);
            base.OnModelCreating(modelBuilder);
        }
    }
}
