﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using gestion_inventario.Models;

#nullable disable

namespace gestion_inventario.Migrations
{
    [DbContext(typeof(DbContextInventario))]
    partial class DbContextInventarioModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("gestion_inventario.Models.Bodega", b =>
                {
                    b.Property<string>("id_bodega")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("direccion")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<DateTime>("fecha_actualizacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecha_creacion")
                        .HasColumnType("datetime2");

                    b.Property<string>("nombre_bodega")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.HasKey("id_bodega");

                    b.ToTable("bodegas");
                });

            modelBuilder.Entity("gestion_inventario.Models.Categoria", b =>
                {
                    b.Property<string>("id_categoria")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("fecha_actualizacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecha_creacion")
                        .HasColumnType("datetime2");

                    b.Property<string>("nombre_categoria")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.HasKey("id_categoria");

                    b.ToTable("Categoria");
                });

            modelBuilder.Entity("gestion_inventario.Models.HistoricoMovimiento", b =>
                {
                    b.Property<int>("id_movimiento")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id_movimiento"));

                    b.Property<string>("comentarios")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("varchar(150)");

                    b.Property<DateTime>("fecha_actualizacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecha_creacion")
                        .HasColumnType("datetime2");

                    b.Property<string>("id_inventario")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("id_tipo_movimiento")
                        .HasColumnType("int");

                    b.Property<long>("id_user")
                        .HasColumnType("bigint");

                    b.HasKey("id_movimiento");

                    b.HasIndex("id_inventario");

                    b.HasIndex("id_tipo_movimiento");

                    b.HasIndex("id_user");

                    b.ToTable("historico_movimientos");
                });

            modelBuilder.Entity("gestion_inventario.Models.Inventario", b =>
                {
                    b.Property<string>("id_inventario")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("fecha_actualizacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecha_creacion")
                        .HasColumnType("datetime2");

                    b.Property<string>("id_bodega")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("id_inventario_estado")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("id_producto")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("user")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id_inventario");

                    b.HasIndex("id_bodega");

                    b.HasIndex("id_inventario_estado");

                    b.HasIndex("id_producto");

                    b.ToTable("inventario");
                });

            modelBuilder.Entity("gestion_inventario.Models.InventarioEstado", b =>
                {
                    b.Property<string>("id_inventario_estado")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("fecha_actualizacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecha_creacion")
                        .HasColumnType("datetime2");

                    b.Property<string>("nombre_estado_inventario")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.HasKey("id_inventario_estado");

                    b.ToTable("inventario_estados");
                });

            modelBuilder.Entity("gestion_inventario.Models.MovimientoTipo", b =>
                {
                    b.Property<int>("id_movimiento_tipo")
                        .HasColumnType("int");

                    b.Property<DateTime>("fecha_actualizacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecha_creacion")
                        .HasColumnType("datetime2");

                    b.Property<string>("nombre_movimiento_tipo")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.HasKey("id_movimiento_tipo");

                    b.ToTable("movimiento_tipos");
                });

            modelBuilder.Entity("gestion_inventario.Models.Persona", b =>
                {
                    b.Property<string>("rut")
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)");

                    b.Property<string>("apellidos")
                        .IsRequired()
                        .HasMaxLength(70)
                        .HasColumnType("varchar(70)");

                    b.Property<string>("carrera")
                        .IsRequired()
                        .HasMaxLength(70)
                        .HasColumnType("varchar(70)");

                    b.Property<DateTime>("fecha_actualizacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecha_creacion")
                        .HasColumnType("datetime2");

                    b.Property<string>("genero")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)");

                    b.Property<string>("id_credencial")
                        .IsRequired()
                        .HasMaxLength(70)
                        .HasColumnType("nvarchar(70)");

                    b.Property<int>("id_tipo_persona")
                        .HasColumnType("int");

                    b.Property<string>("nombres")
                        .IsRequired()
                        .HasMaxLength(70)
                        .HasColumnType("varchar(70)");

                    b.HasKey("rut");

                    b.HasIndex("id_tipo_persona");

                    b.ToTable("Persona");
                });

            modelBuilder.Entity("gestion_inventario.Models.Prestamo", b =>
                {
                    b.Property<long>("id_prestamo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("id_prestamo"));

                    b.Property<bool>("entregado")
                        .HasColumnType("bit");

                    b.Property<DateTime>("fecha_actualizacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecha_creacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecha_plazo")
                        .HasColumnType("datetime2");

                    b.Property<long>("id_user")
                        .HasColumnType("bigint");

                    b.Property<string>("rut")
                        .IsRequired()
                        .HasColumnType("varchar(15)");

                    b.HasKey("id_prestamo");

                    b.HasIndex("id_user");

                    b.HasIndex("rut");

                    b.ToTable("prestamos");
                });

            modelBuilder.Entity("gestion_inventario.Models.PrestamoDetalle", b =>
                {
                    b.Property<long>("id_prestamo_detalle")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("id_prestamo_detalle"));

                    b.Property<string>("id_inventario")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<long>("id_prestamo")
                        .HasColumnType("bigint");

                    b.HasKey("id_prestamo_detalle");

                    b.HasIndex("id_inventario");

                    b.HasIndex("id_prestamo");

                    b.ToTable("prestamo_detalles");
                });

            modelBuilder.Entity("gestion_inventario.Models.Producto", b =>
                {
                    b.Property<string>("id_producto")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("descripcion")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("varchar(300)");

                    b.Property<DateTime>("fecha_actualizacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecha_creacion")
                        .HasColumnType("datetime2");

                    b.Property<string>("id_categoria")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("id_proveedor")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("id_tipo_producto")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("marca")
                        .IsRequired()
                        .HasMaxLength(90)
                        .HasColumnType("varchar(90)");

                    b.Property<string>("nombre_producto")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.HasKey("id_producto");

                    b.HasIndex("id_categoria");

                    b.HasIndex("id_proveedor");

                    b.HasIndex("id_tipo_producto");

                    b.ToTable("productos");
                });

            modelBuilder.Entity("gestion_inventario.Models.Proveedor", b =>
                {
                    b.Property<string>("id_proveedor")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("correo")
                        .IsRequired()
                        .HasColumnType("varchar(90)");

                    b.Property<DateTime>("fecha_actualizacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecha_creacion")
                        .HasColumnType("datetime2");

                    b.Property<string>("nombre_proveedor")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("telefono")
                        .IsRequired()
                        .HasColumnType("varchar(15)");

                    b.HasKey("id_proveedor");

                    b.ToTable("proveedores");
                });

            modelBuilder.Entity("gestion_inventario.Models.Rol", b =>
                {
                    b.Property<int>("id_rol")
                        .HasColumnType("int");

                    b.Property<DateTime>("fecha_actualizacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecha_creacion")
                        .HasColumnType("datetime2");

                    b.Property<string>("nombre_rol")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.HasKey("id_rol");

                    b.ToTable("roles");
                });

            modelBuilder.Entity("gestion_inventario.Models.TipoPersona", b =>
                {
                    b.Property<int>("id_tipo_persona")
                        .HasColumnType("int");

                    b.Property<DateTime>("fecha_actualizacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecha_creacion")
                        .HasColumnType("datetime2");

                    b.Property<string>("nombre_tipo_persona")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.HasKey("id_tipo_persona");

                    b.ToTable("tipos_personas");
                });

            modelBuilder.Entity("gestion_inventario.Models.TipoProducto", b =>
                {
                    b.Property<string>("id_tipo_producto")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("fecha_actualizacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecha_creacion")
                        .HasColumnType("datetime2");

                    b.Property<string>("nombre_tipo_producto")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");

                    b.HasKey("id_tipo_producto");

                    b.ToTable("tipos_producto");
                });

            modelBuilder.Entity("gestion_inventario.Models.Usuario", b =>
                {
                    b.Property<long>("id_user")
                        .HasColumnType("bigint");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<DateTime>("fecha_actualizacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecha_creacion")
                        .HasColumnType("datetime2");

                    b.Property<int>("id_rol")
                        .HasColumnType("int");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("varchar(1000)");

                    b.Property<string>("username")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.HasKey("id_user");

                    b.HasIndex("id_rol");

                    b.ToTable("usuariosSistema");
                });

            modelBuilder.Entity("gestion_inventario.Models.HistoricoMovimiento", b =>
                {
                    b.HasOne("gestion_inventario.Models.Inventario", "inventarioNavigation")
                        .WithMany("historicos")
                        .HasForeignKey("id_inventario")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("gestion_inventario.Models.MovimientoTipo", "movimientoTipoNavigation")
                        .WithMany("historicos")
                        .HasForeignKey("id_tipo_movimiento")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("gestion_inventario.Models.Usuario", "usuarioNavegation")
                        .WithMany("historicos")
                        .HasForeignKey("id_user")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("inventarioNavigation");

                    b.Navigation("movimientoTipoNavigation");

                    b.Navigation("usuarioNavegation");
                });

            modelBuilder.Entity("gestion_inventario.Models.Inventario", b =>
                {
                    b.HasOne("gestion_inventario.Models.Bodega", "bodegaNavigation")
                        .WithMany("inventarios")
                        .HasForeignKey("id_bodega")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("gestion_inventario.Models.InventarioEstado", "InventarioEstadoNavigation")
                        .WithMany("inventarios")
                        .HasForeignKey("id_inventario_estado")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("gestion_inventario.Models.Producto", "productoNavigation")
                        .WithMany("inventarios")
                        .HasForeignKey("id_producto")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("InventarioEstadoNavigation");

                    b.Navigation("bodegaNavigation");

                    b.Navigation("productoNavigation");
                });

            modelBuilder.Entity("gestion_inventario.Models.Persona", b =>
                {
                    b.HasOne("gestion_inventario.Models.TipoPersona", "TipoPersonaNavegation")
                        .WithMany("personas")
                        .HasForeignKey("id_tipo_persona")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("TipoPersonaNavegation");
                });

            modelBuilder.Entity("gestion_inventario.Models.Prestamo", b =>
                {
                    b.HasOne("gestion_inventario.Models.Usuario", "userNavegation")
                        .WithMany("prestamos")
                        .HasForeignKey("id_user")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("gestion_inventario.Models.Persona", "personaNavigation")
                        .WithMany("prestamos")
                        .HasForeignKey("rut")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("personaNavigation");

                    b.Navigation("userNavegation");
                });

            modelBuilder.Entity("gestion_inventario.Models.PrestamoDetalle", b =>
                {
                    b.HasOne("gestion_inventario.Models.Inventario", "inventarioNavigation")
                        .WithMany("prestamos_detalle")
                        .HasForeignKey("id_inventario")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("gestion_inventario.Models.Prestamo", "prestamoNavigation")
                        .WithMany("prestamo_detalles")
                        .HasForeignKey("id_prestamo")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("inventarioNavigation");

                    b.Navigation("prestamoNavigation");
                });

            modelBuilder.Entity("gestion_inventario.Models.Producto", b =>
                {
                    b.HasOne("gestion_inventario.Models.Categoria", "categoriaNavigation")
                        .WithMany("productos")
                        .HasForeignKey("id_categoria")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("gestion_inventario.Models.Proveedor", "ProveedorNavigation")
                        .WithMany("productos")
                        .HasForeignKey("id_proveedor")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("gestion_inventario.Models.TipoProducto", "tipoProductoNavigation")
                        .WithMany("productos")
                        .HasForeignKey("id_tipo_producto")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ProveedorNavigation");

                    b.Navigation("categoriaNavigation");

                    b.Navigation("tipoProductoNavigation");
                });

            modelBuilder.Entity("gestion_inventario.Models.Usuario", b =>
                {
                    b.HasOne("gestion_inventario.Models.Rol", "rolNavigation")
                        .WithMany("Usuarios")
                        .HasForeignKey("id_rol")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("rolNavigation");
                });

            modelBuilder.Entity("gestion_inventario.Models.Bodega", b =>
                {
                    b.Navigation("inventarios");
                });

            modelBuilder.Entity("gestion_inventario.Models.Categoria", b =>
                {
                    b.Navigation("productos");
                });

            modelBuilder.Entity("gestion_inventario.Models.Inventario", b =>
                {
                    b.Navigation("historicos");

                    b.Navigation("prestamos_detalle");
                });

            modelBuilder.Entity("gestion_inventario.Models.InventarioEstado", b =>
                {
                    b.Navigation("inventarios");
                });

            modelBuilder.Entity("gestion_inventario.Models.MovimientoTipo", b =>
                {
                    b.Navigation("historicos");
                });

            modelBuilder.Entity("gestion_inventario.Models.Persona", b =>
                {
                    b.Navigation("prestamos");
                });

            modelBuilder.Entity("gestion_inventario.Models.Prestamo", b =>
                {
                    b.Navigation("prestamo_detalles");
                });

            modelBuilder.Entity("gestion_inventario.Models.Producto", b =>
                {
                    b.Navigation("inventarios");
                });

            modelBuilder.Entity("gestion_inventario.Models.Proveedor", b =>
                {
                    b.Navigation("productos");
                });

            modelBuilder.Entity("gestion_inventario.Models.Rol", b =>
                {
                    b.Navigation("Usuarios");
                });

            modelBuilder.Entity("gestion_inventario.Models.TipoPersona", b =>
                {
                    b.Navigation("personas");
                });

            modelBuilder.Entity("gestion_inventario.Models.TipoProducto", b =>
                {
                    b.Navigation("productos");
                });

            modelBuilder.Entity("gestion_inventario.Models.Usuario", b =>
                {
                    b.Navigation("historicos");

                    b.Navigation("prestamos");
                });
#pragma warning restore 612, 618
        }
    }
}
