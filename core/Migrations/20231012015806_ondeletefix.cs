using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gestion_inventario.Migrations
{
    /// <inheritdoc />
    public partial class ondeletefix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_historico_movimientos_movimiento_tipos_id_tipo_movimiento",
                table: "historico_movimientos");

            migrationBuilder.DropForeignKey(
                name: "FK_inventario_bodegas_id_bodega",
                table: "inventario");

            migrationBuilder.DropForeignKey(
                name: "FK_inventario_inventario_estados_id_inventario_estado",
                table: "inventario");

            migrationBuilder.DropForeignKey(
                name: "FK_inventario_productos_id_producto",
                table: "inventario");

            migrationBuilder.DropForeignKey(
                name: "FK_prestamo_detalles_prestamos_id_prestamo",
                table: "prestamo_detalles");

            migrationBuilder.DropForeignKey(
                name: "FK_prestamos_Persona_rut",
                table: "prestamos");

            migrationBuilder.DropForeignKey(
                name: "FK_productos_Categoria_id_categoria",
                table: "productos");

            migrationBuilder.DropForeignKey(
                name: "FK_productos_proveedores_id_proveedor",
                table: "productos");

            migrationBuilder.DropForeignKey(
                name: "FK_productos_tipos_producto_id_tipo_producto",
                table: "productos");

            migrationBuilder.DropForeignKey(
                name: "FK_usuariosSistema_roles_id_rol",
                table: "usuariosSistema");

            migrationBuilder.AddForeignKey(
                name: "FK_historico_movimientos_movimiento_tipos_id_tipo_movimiento",
                table: "historico_movimientos",
                column: "id_tipo_movimiento",
                principalTable: "movimiento_tipos",
                principalColumn: "id_movimiento_tipo",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_inventario_bodegas_id_bodega",
                table: "inventario",
                column: "id_bodega",
                principalTable: "bodegas",
                principalColumn: "id_bodega",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_inventario_inventario_estados_id_inventario_estado",
                table: "inventario",
                column: "id_inventario_estado",
                principalTable: "inventario_estados",
                principalColumn: "id_inventario_estado",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_inventario_productos_id_producto",
                table: "inventario",
                column: "id_producto",
                principalTable: "productos",
                principalColumn: "id_producto",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_prestamo_detalles_prestamos_id_prestamo",
                table: "prestamo_detalles",
                column: "id_prestamo",
                principalTable: "prestamos",
                principalColumn: "id_prestamo",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_prestamos_Persona_rut",
                table: "prestamos",
                column: "rut",
                principalTable: "Persona",
                principalColumn: "rut",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_productos_Categoria_id_categoria",
                table: "productos",
                column: "id_categoria",
                principalTable: "Categoria",
                principalColumn: "id_categoria",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_productos_proveedores_id_proveedor",
                table: "productos",
                column: "id_proveedor",
                principalTable: "proveedores",
                principalColumn: "id_proveedor",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_productos_tipos_producto_id_tipo_producto",
                table: "productos",
                column: "id_tipo_producto",
                principalTable: "tipos_producto",
                principalColumn: "id_tipo_producto",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_usuariosSistema_roles_id_rol",
                table: "usuariosSistema",
                column: "id_rol",
                principalTable: "roles",
                principalColumn: "id_rol",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_historico_movimientos_movimiento_tipos_id_tipo_movimiento",
                table: "historico_movimientos");

            migrationBuilder.DropForeignKey(
                name: "FK_inventario_bodegas_id_bodega",
                table: "inventario");

            migrationBuilder.DropForeignKey(
                name: "FK_inventario_inventario_estados_id_inventario_estado",
                table: "inventario");

            migrationBuilder.DropForeignKey(
                name: "FK_inventario_productos_id_producto",
                table: "inventario");

            migrationBuilder.DropForeignKey(
                name: "FK_prestamo_detalles_prestamos_id_prestamo",
                table: "prestamo_detalles");

            migrationBuilder.DropForeignKey(
                name: "FK_prestamos_Persona_rut",
                table: "prestamos");

            migrationBuilder.DropForeignKey(
                name: "FK_productos_Categoria_id_categoria",
                table: "productos");

            migrationBuilder.DropForeignKey(
                name: "FK_productos_proveedores_id_proveedor",
                table: "productos");

            migrationBuilder.DropForeignKey(
                name: "FK_productos_tipos_producto_id_tipo_producto",
                table: "productos");

            migrationBuilder.DropForeignKey(
                name: "FK_usuariosSistema_roles_id_rol",
                table: "usuariosSistema");

            migrationBuilder.AddForeignKey(
                name: "FK_historico_movimientos_movimiento_tipos_id_tipo_movimiento",
                table: "historico_movimientos",
                column: "id_tipo_movimiento",
                principalTable: "movimiento_tipos",
                principalColumn: "id_movimiento_tipo",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_inventario_bodegas_id_bodega",
                table: "inventario",
                column: "id_bodega",
                principalTable: "bodegas",
                principalColumn: "id_bodega",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_inventario_inventario_estados_id_inventario_estado",
                table: "inventario",
                column: "id_inventario_estado",
                principalTable: "inventario_estados",
                principalColumn: "id_inventario_estado",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_inventario_productos_id_producto",
                table: "inventario",
                column: "id_producto",
                principalTable: "productos",
                principalColumn: "id_producto",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_prestamo_detalles_prestamos_id_prestamo",
                table: "prestamo_detalles",
                column: "id_prestamo",
                principalTable: "prestamos",
                principalColumn: "id_prestamo",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_prestamos_Persona_rut",
                table: "prestamos",
                column: "rut",
                principalTable: "Persona",
                principalColumn: "rut",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_productos_Categoria_id_categoria",
                table: "productos",
                column: "id_categoria",
                principalTable: "Categoria",
                principalColumn: "id_categoria",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_productos_proveedores_id_proveedor",
                table: "productos",
                column: "id_proveedor",
                principalTable: "proveedores",
                principalColumn: "id_proveedor",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_productos_tipos_producto_id_tipo_producto",
                table: "productos",
                column: "id_tipo_producto",
                principalTable: "tipos_producto",
                principalColumn: "id_tipo_producto",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_usuariosSistema_roles_id_rol",
                table: "usuariosSistema",
                column: "id_rol",
                principalTable: "roles",
                principalColumn: "id_rol",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
