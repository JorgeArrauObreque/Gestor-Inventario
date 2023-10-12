using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gestion_inventario.Migrations
{
    /// <inheritdoc />
    public partial class fixreferences : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "user",
                table: "prestamos");

            migrationBuilder.DropColumn(
                name: "user",
                table: "historico_movimientos");

            migrationBuilder.RenameColumn(
                name: "varchar(50)",
                table: "tipos_personas",
                newName: "nombre_tipo_persona");

            migrationBuilder.AlterColumn<string>(
                name: "nombre_tipo_persona",
                table: "tipos_personas",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<long>(
                name: "id_user",
                table: "prestamos",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "id_inventario",
                table: "prestamo_detalles",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<string>(
                name: "id_inventario",
                table: "historico_movimientos",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<long>(
                name: "id_user",
                table: "historico_movimientos",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_prestamos_id_user",
                table: "prestamos",
                column: "id_user");

            migrationBuilder.CreateIndex(
                name: "IX_prestamo_detalles_id_inventario",
                table: "prestamo_detalles",
                column: "id_inventario");

            migrationBuilder.CreateIndex(
                name: "IX_historico_movimientos_id_inventario",
                table: "historico_movimientos",
                column: "id_inventario");

            migrationBuilder.CreateIndex(
                name: "IX_historico_movimientos_id_user",
                table: "historico_movimientos",
                column: "id_user");

            migrationBuilder.AddForeignKey(
                name: "FK_historico_movimientos_inventario_id_inventario",
                table: "historico_movimientos",
                column: "id_inventario",
                principalTable: "inventario",
                principalColumn: "id_inventario",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_historico_movimientos_usuariosSistema_id_user",
                table: "historico_movimientos",
                column: "id_user",
                principalTable: "usuariosSistema",
                principalColumn: "id_user",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_prestamo_detalles_inventario_id_inventario",
                table: "prestamo_detalles",
                column: "id_inventario",
                principalTable: "inventario",
                principalColumn: "id_inventario",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_prestamos_usuariosSistema_id_user",
                table: "prestamos",
                column: "id_user",
                principalTable: "usuariosSistema",
                principalColumn: "id_user",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_historico_movimientos_inventario_id_inventario",
                table: "historico_movimientos");

            migrationBuilder.DropForeignKey(
                name: "FK_historico_movimientos_usuariosSistema_id_user",
                table: "historico_movimientos");

            migrationBuilder.DropForeignKey(
                name: "FK_prestamo_detalles_inventario_id_inventario",
                table: "prestamo_detalles");

            migrationBuilder.DropForeignKey(
                name: "FK_prestamos_usuariosSistema_id_user",
                table: "prestamos");

            migrationBuilder.DropIndex(
                name: "IX_prestamos_id_user",
                table: "prestamos");

            migrationBuilder.DropIndex(
                name: "IX_prestamo_detalles_id_inventario",
                table: "prestamo_detalles");

            migrationBuilder.DropIndex(
                name: "IX_historico_movimientos_id_inventario",
                table: "historico_movimientos");

            migrationBuilder.DropIndex(
                name: "IX_historico_movimientos_id_user",
                table: "historico_movimientos");

            migrationBuilder.DropColumn(
                name: "id_user",
                table: "prestamos");

            migrationBuilder.DropColumn(
                name: "id_user",
                table: "historico_movimientos");

            migrationBuilder.RenameColumn(
                name: "nombre_tipo_persona",
                table: "tipos_personas",
                newName: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "varchar(50)",
                table: "tipos_personas",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AddColumn<string>(
                name: "user",
                table: "prestamos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<long>(
                name: "id_inventario",
                table: "prestamo_detalles",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<int>(
                name: "id_inventario",
                table: "historico_movimientos",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "user",
                table: "historico_movimientos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
