using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gestion_inventario.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "bodegas",
                columns: table => new
                {
                    id_bodega = table.Column<int>(type: "int", nullable: false),
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
                    id_categoria = table.Column<int>(type: "int", nullable: false),
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
                    id_inventario_estado = table.Column<int>(type: "int", nullable: false),
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
                    id_movimiento_tipo = table.Column<int>(type: "int", nullable: false),
                    nombre_movimiento_tipo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movimiento_tipos", x => x.id_movimiento_tipo);
                });

            migrationBuilder.CreateTable(
                name: "Persona",
                columns: table => new
                {
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
                    table.PrimaryKey("PK_Persona", x => x.rut);
                });

            migrationBuilder.CreateTable(
                name: "proveedores",
                columns: table => new
                {
                    id_proveedor = table.Column<int>(type: "int", nullable: false),
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
                    id_tipo_producto = table.Column<int>(type: "int", nullable: false),
                    nombre_tipo_producto = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipos_producto", x => x.id_tipo_producto);
                });

            migrationBuilder.CreateTable(
                name: "historico_movimientos",
                columns: table => new
                {
                    id_movimiento = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_tipo_movimiento = table.Column<int>(type: "int", nullable: false),
                    id_inventario = table.Column<int>(type: "int", nullable: false),
                    comentarios = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    user = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_historico_movimientos", x => x.id_movimiento);
                    table.ForeignKey(
                        name: "FK_historico_movimientos_movimiento_tipos_id_tipo_movimiento",
                        column: x => x.id_tipo_movimiento,
                        principalTable: "movimiento_tipos",
                        principalColumn: "id_movimiento_tipo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "prestamos",
                columns: table => new
                {
                    id_prestamo = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    rut = table.Column<string>(type: "varchar(15)", nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    entregado = table.Column<bool>(type: "bit", nullable: false),
                    fecha_plazo = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_prestamos", x => x.id_prestamo);
                    table.ForeignKey(
                        name: "FK_prestamos_Persona_rut",
                        column: x => x.rut,
                        principalTable: "Persona",
                        principalColumn: "rut",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "productos",
                columns: table => new
                {
                    id_producto = table.Column<int>(type: "int", nullable: false),
                    nombre_producto = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    id_proveedor = table.Column<int>(type: "int", nullable: false),
                    marca = table.Column<string>(type: "varchar(90)", maxLength: 90, nullable: false),
                    descripcion = table.Column<string>(type: "varchar(300)", maxLength: 300, nullable: false),
                    id_categoria = table.Column<int>(type: "int", nullable: false),
                    id_tipo_producto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_productos", x => x.id_producto);
                    table.ForeignKey(
                        name: "FK_productos_Categoria_id_categoria",
                        column: x => x.id_categoria,
                        principalTable: "Categoria",
                        principalColumn: "id_categoria",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_productos_proveedores_id_proveedor",
                        column: x => x.id_proveedor,
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
                name: "prestamo_detalles",
                columns: table => new
                {
                    id_prestamo_detalle = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_inventario = table.Column<long>(type: "bigint", nullable: false),
                    id_prestamo = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_prestamo_detalles", x => x.id_prestamo_detalle);
                    table.ForeignKey(
                        name: "FK_prestamo_detalles_prestamos_id_prestamo",
                        column: x => x.id_prestamo,
                        principalTable: "prestamos",
                        principalColumn: "id_prestamo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inventario",
                columns: table => new
                {
                    id_inventario = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    id_producto = table.Column<int>(type: "int", nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    id_bodega = table.Column<int>(type: "int", nullable: false),
                    id_inventario_estado = table.Column<int>(type: "int", nullable: false),
                    user = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inventario", x => x.id_inventario);
                    table.ForeignKey(
                        name: "FK_inventario_bodegas_id_bodega",
                        column: x => x.id_bodega,
                        principalTable: "bodegas",
                        principalColumn: "id_bodega",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_inventario_inventario_estados_id_inventario_estado",
                        column: x => x.id_inventario_estado,
                        principalTable: "inventario_estados",
                        principalColumn: "id_inventario_estado",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_inventario_productos_id_producto",
                        column: x => x.id_producto,
                        principalTable: "productos",
                        principalColumn: "id_producto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_historico_movimientos_id_tipo_movimiento",
                table: "historico_movimientos",
                column: "id_tipo_movimiento");

            migrationBuilder.CreateIndex(
                name: "IX_inventario_id_bodega",
                table: "inventario",
                column: "id_bodega");

            migrationBuilder.CreateIndex(
                name: "IX_inventario_id_inventario_estado",
                table: "inventario",
                column: "id_inventario_estado");

            migrationBuilder.CreateIndex(
                name: "IX_inventario_id_producto",
                table: "inventario",
                column: "id_producto");

            migrationBuilder.CreateIndex(
                name: "IX_prestamo_detalles_id_prestamo",
                table: "prestamo_detalles",
                column: "id_prestamo");

            migrationBuilder.CreateIndex(
                name: "IX_prestamos_rut",
                table: "prestamos",
                column: "rut");

            migrationBuilder.CreateIndex(
                name: "IX_productos_id_categoria",
                table: "productos",
                column: "id_categoria");

            migrationBuilder.CreateIndex(
                name: "IX_productos_id_proveedor",
                table: "productos",
                column: "id_proveedor");

            migrationBuilder.CreateIndex(
                name: "IX_productos_id_tipo_producto",
                table: "productos",
                column: "id_tipo_producto");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "historico_movimientos");

            migrationBuilder.DropTable(
                name: "inventario");

            migrationBuilder.DropTable(
                name: "prestamo_detalles");

            migrationBuilder.DropTable(
                name: "movimiento_tipos");

            migrationBuilder.DropTable(
                name: "bodegas");

            migrationBuilder.DropTable(
                name: "inventario_estados");

            migrationBuilder.DropTable(
                name: "productos");

            migrationBuilder.DropTable(
                name: "prestamos");

            migrationBuilder.DropTable(
                name: "Categoria");

            migrationBuilder.DropTable(
                name: "proveedores");

            migrationBuilder.DropTable(
                name: "tipos_producto");

            migrationBuilder.DropTable(
                name: "Persona");
        }
    }
}
