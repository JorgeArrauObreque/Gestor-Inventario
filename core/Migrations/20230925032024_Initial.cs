using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gestion_inventario.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "bodegas",
                columns: table => new
                {
                    id_bodega = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    direccion = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bodegas", x => x.id_bodega);
                });

            migrationBuilder.CreateTable(
                name: "Categoria",
                columns: table => new
                {
                    id_categoria = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_categoria = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categoria", x => x.id_categoria);
                });

            migrationBuilder.CreateTable(
                name: "inventario_estados",
                columns: table => new
                {
                    id_inventario_estado = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_estado_inventario = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inventario_estados", x => x.id_inventario_estado);
                });

            migrationBuilder.CreateTable(
                name: "movimiento_tipos",
                columns: table => new
                {
                    id_movimiento_tipo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_movimiento_tipo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movimiento_tipos", x => x.id_movimiento_tipo);
                });

            migrationBuilder.CreateTable(
                name: "proveedores",
                columns: table => new
                {
                    id_proveedor = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_proveedor = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    correo = table.Column<string>(type: "varchar(90)", nullable: false),
                    telefono = table.Column<string>(type: "varchar(15)", nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_proveedores", x => x.id_proveedor);
                });

            migrationBuilder.CreateTable(
                name: "tipos_producto",
                columns: table => new
                {
                    id_tipo_producto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_tipo_producto = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipos_producto", x => x.id_tipo_producto);
                });

            migrationBuilder.CreateTable(
                name: "usuarios",
                columns: table => new
                {
                    id_alumno = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rut = table.Column<string>(type: "varchar(15)", maxLength: 15, nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    nombres = table.Column<string>(type: "varchar(70)", maxLength: 70, nullable: false),
                    apellidos = table.Column<string>(type: "varchar(70)", maxLength: 70, nullable: false),
                    carrera = table.Column<string>(type: "varchar(70)", maxLength: 70, nullable: false),
                    genero = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuarios", x => x.id_alumno);
                });

            migrationBuilder.CreateTable(
                name: "productos",
                columns: table => new
                {
                    id_producto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_producto = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    id_proveedor = table.Column<int>(type: "int", nullable: false),
                    ProveedorNavigationid_proveedor = table.Column<int>(type: "int", nullable: false),
                    marca = table.Column<string>(type: "varchar(90)", maxLength: 90, nullable: false),
                    descripcion = table.Column<string>(type: "varchar(300)", maxLength: 300, nullable: false),
                    id_categoria = table.Column<int>(type: "int", nullable: false),
                    categoriaNavigationid_categoria = table.Column<int>(type: "int", nullable: false),
                    id_tipo_producto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_productos", x => x.id_producto);
                    table.ForeignKey(
                        name: "FK_productos_Categoria_categoriaNavigationid_categoria",
                        column: x => x.categoriaNavigationid_categoria,
                        principalTable: "Categoria",
                        principalColumn: "id_categoria",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_productos_proveedores_ProveedorNavigationid_proveedor",
                        column: x => x.ProveedorNavigationid_proveedor,
                        principalTable: "proveedores",
                        principalColumn: "id_proveedor",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_productos_tipos_producto_id_tipo_producto",
                        column: x => x.id_tipo_producto,
                        principalTable: "tipos_producto",
                        principalColumn: "id_tipo_producto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "prestamos",
                columns: table => new
                {
                    id_prestamo = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    id_persona = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    personaNavigationid_alumno = table.Column<long>(type: "bigint", nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    entregado = table.Column<bool>(type: "bit", nullable: false),
                    fecha_plazo = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_prestamos", x => x.id_prestamo);
                    table.ForeignKey(
                        name: "FK_prestamos_usuarios_personaNavigationid_alumno",
                        column: x => x.personaNavigationid_alumno,
                        principalTable: "usuarios",
                        principalColumn: "id_alumno",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inventario",
                columns: table => new
                {
                    id_inventario = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_producto = table.Column<int>(type: "int", nullable: false),
                    productoNavigationid_producto = table.Column<int>(type: "int", nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    bodega = table.Column<int>(type: "int", nullable: false),
                    bodegaNavigationid_bodega = table.Column<int>(type: "int", nullable: false),
                    id_inventario_estado = table.Column<int>(type: "int", nullable: false),
                    InventarioEstadoNavigationid_inventario_estado = table.Column<int>(type: "int", nullable: false),
                    user = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inventario", x => x.id_inventario);
                    table.ForeignKey(
                        name: "FK_inventario_bodegas_bodegaNavigationid_bodega",
                        column: x => x.bodegaNavigationid_bodega,
                        principalTable: "bodegas",
                        principalColumn: "id_bodega",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_inventario_inventario_estados_InventarioEstadoNavigationid_inventario_estado",
                        column: x => x.InventarioEstadoNavigationid_inventario_estado,
                        principalTable: "inventario_estados",
                        principalColumn: "id_inventario_estado",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_inventario_productos_productoNavigationid_producto",
                        column: x => x.productoNavigationid_producto,
                        principalTable: "productos",
                        principalColumn: "id_producto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "historico_movimientos",
                columns: table => new
                {
                    id_movimiento = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_tipo_movimiento = table.Column<int>(type: "int", nullable: false),
                    movimientoTipoNavigationid_movimiento_tipo = table.Column<int>(type: "int", nullable: false),
                    id_inventario = table.Column<int>(type: "int", nullable: false),
                    inventarioNavigationid_inventario = table.Column<long>(type: "bigint", nullable: false),
                    comentarios = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    user = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_historico_movimientos", x => x.id_movimiento);
                    table.ForeignKey(
                        name: "FK_historico_movimientos_inventario_inventarioNavigationid_inventario",
                        column: x => x.inventarioNavigationid_inventario,
                        principalTable: "inventario",
                        principalColumn: "id_inventario",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_historico_movimientos_movimiento_tipos_movimientoTipoNavigationid_movimiento_tipo",
                        column: x => x.movimientoTipoNavigationid_movimiento_tipo,
                        principalTable: "movimiento_tipos",
                        principalColumn: "id_movimiento_tipo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "prestamo_detalles",
                columns: table => new
                {
                    id_prestamo_detalle = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_inventario = table.Column<long>(type: "bigint", nullable: false),
                    inventarioNavigationid_inventario = table.Column<long>(type: "bigint", nullable: false),
                    id_prestamo = table.Column<long>(type: "bigint", nullable: false),
                    prestamoNavigationid_prestamo = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_prestamo_detalles", x => x.id_prestamo_detalle);
                    table.ForeignKey(
                        name: "FK_prestamo_detalles_inventario_inventarioNavigationid_inventario",
                        column: x => x.inventarioNavigationid_inventario,
                        principalTable: "inventario",
                        principalColumn: "id_inventario",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_prestamo_detalles_prestamos_prestamoNavigationid_prestamo",
                        column: x => x.prestamoNavigationid_prestamo,
                        principalTable: "prestamos",
                        principalColumn: "id_prestamo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_historico_movimientos_inventarioNavigationid_inventario",
                table: "historico_movimientos",
                column: "inventarioNavigationid_inventario");

            migrationBuilder.CreateIndex(
                name: "IX_historico_movimientos_movimientoTipoNavigationid_movimiento_tipo",
                table: "historico_movimientos",
                column: "movimientoTipoNavigationid_movimiento_tipo");

            migrationBuilder.CreateIndex(
                name: "IX_inventario_bodegaNavigationid_bodega",
                table: "inventario",
                column: "bodegaNavigationid_bodega");

            migrationBuilder.CreateIndex(
                name: "IX_inventario_InventarioEstadoNavigationid_inventario_estado",
                table: "inventario",
                column: "InventarioEstadoNavigationid_inventario_estado");

            migrationBuilder.CreateIndex(
                name: "IX_inventario_productoNavigationid_producto",
                table: "inventario",
                column: "productoNavigationid_producto");

            migrationBuilder.CreateIndex(
                name: "IX_prestamo_detalles_inventarioNavigationid_inventario",
                table: "prestamo_detalles",
                column: "inventarioNavigationid_inventario");

            migrationBuilder.CreateIndex(
                name: "IX_prestamo_detalles_prestamoNavigationid_prestamo",
                table: "prestamo_detalles",
                column: "prestamoNavigationid_prestamo");

            migrationBuilder.CreateIndex(
                name: "IX_prestamos_personaNavigationid_alumno",
                table: "prestamos",
                column: "personaNavigationid_alumno");

            migrationBuilder.CreateIndex(
                name: "IX_productos_categoriaNavigationid_categoria",
                table: "productos",
                column: "categoriaNavigationid_categoria");

            migrationBuilder.CreateIndex(
                name: "IX_productos_id_tipo_producto",
                table: "productos",
                column: "id_tipo_producto");

            migrationBuilder.CreateIndex(
                name: "IX_productos_ProveedorNavigationid_proveedor",
                table: "productos",
                column: "ProveedorNavigationid_proveedor");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "historico_movimientos");

            migrationBuilder.DropTable(
                name: "prestamo_detalles");

            migrationBuilder.DropTable(
                name: "movimiento_tipos");

            migrationBuilder.DropTable(
                name: "inventario");

            migrationBuilder.DropTable(
                name: "prestamos");

            migrationBuilder.DropTable(
                name: "bodegas");

            migrationBuilder.DropTable(
                name: "inventario_estados");

            migrationBuilder.DropTable(
                name: "productos");

            migrationBuilder.DropTable(
                name: "usuarios");

            migrationBuilder.DropTable(
                name: "Categoria");

            migrationBuilder.DropTable(
                name: "proveedores");

            migrationBuilder.DropTable(
                name: "tipos_producto");
        }
    }
}
