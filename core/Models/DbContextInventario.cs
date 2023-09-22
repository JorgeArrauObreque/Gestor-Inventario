
using Microsoft.EntityFrameworkCore;

namespace gestion_inventario.Models
{
    public class DbContextInventario:DbContext
    {
        public DbSet<Categoria> categorias { get; set; }
        public DbSet<TipoProducto> tipos_producto { get; set; }
        public DbContextInventario(DbContextOptions<DbContextInventario> options):base(options) { }
        public DbContextInventario() { }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var configuracion = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            options.UseSqlServer(configuracion.GetConnectionString("DefaultConnection"));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            base.OnModelCreating(modelBuilder);
        }
    }
}
