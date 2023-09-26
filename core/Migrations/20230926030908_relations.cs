using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gestion_inventario.Migrations
{
    /// <inheritdoc />
    public partial class relations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_historico_movimientos_inventario_inventarioNavigationid_inventario",
                table: "historico_movimientos");

            migrationBuilder.DropForeignKey(
                name: "FK_historico_movimientos_movimiento_tipos_movimientoTipoNavigationid_movimiento_tipo",
                table: "historico_movimientos");

            migrationBuilder.DropForeignKey(
                name: "FK_inventario_bodegas_bodegaNavigationid_bodega",
                table: "inventario");

            migrationBuilder.DropForeignKey(
                name: "FK_inventario_inventario_estados_InventarioEstadoNavigationid_inventario_estado",
                table: "inventario");

            migrationBuilder.DropForeignKey(
                name: "FK_inventario_productos_productoNavigationid_producto",
                table: "inventario");

            migrationBuilder.DropForeignKey(
                name: "FK_prestamo_detalles_inventario_inventarioNavigationid_inventario",
                table: "prestamo_detalles");

            migrationBuilder.DropForeignKey(
                name: "FK_prestamo_detalles_prestamos_prestamoNavigationid_prestamo",
                table: "prestamo_detalles");

            migrationBuilder.DropForeignKey(
                name: "FK_prestamos_usuarios_personaNavigationid_alumno",
                table: "prestamos");

            migrationBuilder.DropForeignKey(
                name: "FK_productos_Categoria_categoriaNavigationid_categoria",
                table: "productos");

            migrationBuilder.DropForeignKey(
                name: "FK_productos_proveedores_ProveedorNavigationid_proveedor",
                table: "productos");

            migrationBuilder.DropIndex(
                name: "IX_productos_categoriaNavigationid_categoria",
                table: "productos");

            migrationBuilder.DropIndex(
                name: "IX_productos_ProveedorNavigationid_proveedor",
                table: "productos");

            migrationBuilder.DropIndex(
                name: "IX_prestamos_personaNavigationid_alumno",
                table: "prestamos");

            migrationBuilder.DropIndex(
                name: "IX_prestamo_detalles_inventarioNavigationid_inventario",
                table: "prestamo_detalles");

            migrationBuilder.DropIndex(
                name: "IX_prestamo_detalles_prestamoNavigationid_prestamo",
                table: "prestamo_detalles");

            migrationBuilder.DropIndex(
                name: "IX_inventario_bodegaNavigationid_bodega",
                table: "inventario");

            migrationBuilder.DropIndex(
                name: "IX_inventario_InventarioEstadoNavigationid_inventario_estado",
                table: "inventario");

            migrationBuilder.DropIndex(
                name: "IX_historico_movimientos_inventarioNavigationid_inventario",
                table: "historico_movimientos");

            migrationBuilder.DropIndex(
                name: "IX_historico_movimientos_movimientoTipoNavigationid_movimiento_tipo",
                table: "historico_movimientos");

            migrationBuilder.DropColumn(
                name: "ProveedorNavigationid_proveedor",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "categoriaNavigationid_categoria",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "personaNavigationid_alumno",
                table: "prestamos");

            migrationBuilder.DropColumn(
                name: "inventarioNavigationid_inventario",
                table: "prestamo_detalles");

            migrationBuilder.DropColumn(
                name: "prestamoNavigationid_prestamo",
                table: "prestamo_detalles");

            migrationBuilder.DropColumn(
                name: "InventarioEstadoNavigationid_inventario_estado",
                table: "inventario");

            migrationBuilder.DropColumn(
                name: "bodega",
                table: "inventario");

            migrationBuilder.DropColumn(
                name: "bodegaNavigationid_bodega",
                table: "inventario");

            migrationBuilder.DropColumn(
                name: "inventarioNavigationid_inventario",
                table: "historico_movimientos");

            migrationBuilder.DropColumn(
                name: "movimientoTipoNavigationid_movimiento_tipo",
                table: "historico_movimientos");

            migrationBuilder.RenameColumn(
                name: "id_alumno",
                table: "usuarios",
                newName: "id_persona");

            migrationBuilder.RenameColumn(
                name: "productoNavigationid_producto",
                table: "inventario",
                newName: "id_bodega");

            migrationBuilder.RenameIndex(
                name: "IX_inventario_productoNavigationid_producto",
                table: "inventario",
                newName: "IX_inventario_id_bodega");

            migrationBuilder.AlterColumn<long>(
                name: "id_persona",
                table: "prestamos",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_productos_id_categoria",
                table: "productos",
                column: "id_categoria");

            migrationBuilder.CreateIndex(
                name: "IX_productos_id_proveedor",
                table: "productos",
                column: "id_proveedor");

            migrationBuilder.CreateIndex(
                name: "IX_prestamos_id_persona",
                table: "prestamos",
                column: "id_persona");

            migrationBuilder.CreateIndex(
                name: "IX_prestamo_detalles_id_prestamo",
                table: "prestamo_detalles",
                column: "id_prestamo");

            migrationBuilder.CreateIndex(
                name: "IX_inventario_id_inventario_estado",
                table: "inventario",
                column: "id_inventario_estado");

            migrationBuilder.CreateIndex(
                name: "IX_inventario_id_producto",
                table: "inventario",
                column: "id_producto");

            migrationBuilder.CreateIndex(
                name: "IX_historico_movimientos_id_tipo_movimiento",
                table: "historico_movimientos",
                column: "id_tipo_movimiento");

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
                name: "FK_prestamos_usuarios_id_persona",
                table: "prestamos",
                column: "id_persona",
                principalTable: "usuarios",
                principalColumn: "id_persona",
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
                name: "FK_prestamos_usuarios_id_persona",
                table: "prestamos");

            migrationBuilder.DropForeignKey(
                name: "FK_productos_Categoria_id_categoria",
                table: "productos");

            migrationBuilder.DropForeignKey(
                name: "FK_productos_proveedores_id_proveedor",
                table: "productos");

            migrationBuilder.DropIndex(
                name: "IX_productos_id_categoria",
                table: "productos");

            migrationBuilder.DropIndex(
                name: "IX_productos_id_proveedor",
                table: "productos");

            migrationBuilder.DropIndex(
                name: "IX_prestamos_id_persona",
                table: "prestamos");

            migrationBuilder.DropIndex(
                name: "IX_prestamo_detalles_id_prestamo",
                table: "prestamo_detalles");

            migrationBuilder.DropIndex(
                name: "IX_inventario_id_inventario_estado",
                table: "inventario");

            migrationBuilder.DropIndex(
                name: "IX_inventario_id_producto",
                table: "inventario");

            migrationBuilder.DropIndex(
                name: "IX_historico_movimientos_id_tipo_movimiento",
                table: "historico_movimientos");

            migrationBuilder.RenameColumn(
                name: "id_persona",
                table: "usuarios",
                newName: "id_alumno");

            migrationBuilder.RenameColumn(
                name: "id_bodega",
                table: "inventario",
                newName: "productoNavigationid_producto");

            migrationBuilder.RenameIndex(
                name: "IX_inventario_id_bodega",
                table: "inventario",
                newName: "IX_inventario_productoNavigationid_producto");

            migrationBuilder.AddColumn<int>(
                name: "ProveedorNavigationid_proveedor",
                table: "productos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "categoriaNavigationid_categoria",
                table: "productos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "id_persona",
                table: "prestamos",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<long>(
                name: "personaNavigationid_alumno",
                table: "prestamos",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "inventarioNavigationid_inventario",
                table: "prestamo_detalles",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "prestamoNavigationid_prestamo",
                table: "prestamo_detalles",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<int>(
                name: "InventarioEstadoNavigationid_inventario_estado",
                table: "inventario",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "bodega",
                table: "inventario",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "bodegaNavigationid_bodega",
                table: "inventario",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "inventarioNavigationid_inventario",
                table: "historico_movimientos",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<int>(
                name: "movimientoTipoNavigationid_movimiento_tipo",
                table: "historico_movimientos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_productos_categoriaNavigationid_categoria",
                table: "productos",
                column: "categoriaNavigationid_categoria");

            migrationBuilder.CreateIndex(
                name: "IX_productos_ProveedorNavigationid_proveedor",
                table: "productos",
                column: "ProveedorNavigationid_proveedor");

            migrationBuilder.CreateIndex(
                name: "IX_prestamos_personaNavigationid_alumno",
                table: "prestamos",
                column: "personaNavigationid_alumno");

            migrationBuilder.CreateIndex(
                name: "IX_prestamo_detalles_inventarioNavigationid_inventario",
                table: "prestamo_detalles",
                column: "inventarioNavigationid_inventario");

            migrationBuilder.CreateIndex(
                name: "IX_prestamo_detalles_prestamoNavigationid_prestamo",
                table: "prestamo_detalles",
                column: "prestamoNavigationid_prestamo");

            migrationBuilder.CreateIndex(
                name: "IX_inventario_bodegaNavigationid_bodega",
                table: "inventario",
                column: "bodegaNavigationid_bodega");

            migrationBuilder.CreateIndex(
                name: "IX_inventario_InventarioEstadoNavigationid_inventario_estado",
                table: "inventario",
                column: "InventarioEstadoNavigationid_inventario_estado");

            migrationBuilder.CreateIndex(
                name: "IX_historico_movimientos_inventarioNavigationid_inventario",
                table: "historico_movimientos",
                column: "inventarioNavigationid_inventario");

            migrationBuilder.CreateIndex(
                name: "IX_historico_movimientos_movimientoTipoNavigationid_movimiento_tipo",
                table: "historico_movimientos",
                column: "movimientoTipoNavigationid_movimiento_tipo");

            migrationBuilder.AddForeignKey(
                name: "FK_historico_movimientos_inventario_inventarioNavigationid_inventario",
                table: "historico_movimientos",
                column: "inventarioNavigationid_inventario",
                principalTable: "inventario",
                principalColumn: "id_inventario",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_historico_movimientos_movimiento_tipos_movimientoTipoNavigationid_movimiento_tipo",
                table: "historico_movimientos",
                column: "movimientoTipoNavigationid_movimiento_tipo",
                principalTable: "movimiento_tipos",
                principalColumn: "id_movimiento_tipo",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_inventario_bodegas_bodegaNavigationid_bodega",
                table: "inventario",
                column: "bodegaNavigationid_bodega",
                principalTable: "bodegas",
                principalColumn: "id_bodega",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_inventario_inventario_estados_InventarioEstadoNavigationid_inventario_estado",
                table: "inventario",
                column: "InventarioEstadoNavigationid_inventario_estado",
                principalTable: "inventario_estados",
                principalColumn: "id_inventario_estado",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_inventario_productos_productoNavigationid_producto",
                table: "inventario",
                column: "productoNavigationid_producto",
                principalTable: "productos",
                principalColumn: "id_producto",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_prestamo_detalles_inventario_inventarioNavigationid_inventario",
                table: "prestamo_detalles",
                column: "inventarioNavigationid_inventario",
                principalTable: "inventario",
                principalColumn: "id_inventario",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_prestamo_detalles_prestamos_prestamoNavigationid_prestamo",
                table: "prestamo_detalles",
                column: "prestamoNavigationid_prestamo",
                principalTable: "prestamos",
                principalColumn: "id_prestamo",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_prestamos_usuarios_personaNavigationid_alumno",
                table: "prestamos",
                column: "personaNavigationid_alumno",
                principalTable: "usuarios",
                principalColumn: "id_alumno",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_productos_Categoria_categoriaNavigationid_categoria",
                table: "productos",
                column: "categoriaNavigationid_categoria",
                principalTable: "Categoria",
                principalColumn: "id_categoria",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_productos_proveedores_ProveedorNavigationid_proveedor",
                table: "productos",
                column: "ProveedorNavigationid_proveedor",
                principalTable: "proveedores",
                principalColumn: "id_proveedor",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
