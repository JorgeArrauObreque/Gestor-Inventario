using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gestion_inventario.Migrations
{
    /// <inheritdoc />
    public partial class fix_ids : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_prestamos_usuarios_id_persona",
                table: "prestamos");

            migrationBuilder.DropIndex(
                name: "IX_prestamos_id_persona",
                table: "prestamos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_usuarios",
                table: "usuarios");

            migrationBuilder.DropColumn(
                name: "id_persona",
                table: "prestamos");

            migrationBuilder.DropColumn(
                name: "id_persona",
                table: "usuarios");

            migrationBuilder.RenameTable(
                name: "usuarios",
                newName: "Persona");

            migrationBuilder.AddColumn<string>(
                name: "rut",
                table: "prestamos",
                type: "varchar(15)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Persona",
                table: "Persona",
                column: "rut");

            migrationBuilder.CreateIndex(
                name: "IX_prestamos_rut",
                table: "prestamos",
                column: "rut");

            migrationBuilder.AddForeignKey(
                name: "FK_prestamos_Persona_rut",
                table: "prestamos",
                column: "rut",
                principalTable: "Persona",
                principalColumn: "rut",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_prestamos_Persona_rut",
                table: "prestamos");

            migrationBuilder.DropIndex(
                name: "IX_prestamos_rut",
                table: "prestamos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Persona",
                table: "Persona");

            migrationBuilder.DropColumn(
                name: "rut",
                table: "prestamos");

            migrationBuilder.RenameTable(
                name: "Persona",
                newName: "usuarios");

            migrationBuilder.AddColumn<long>(
                name: "id_persona",
                table: "prestamos",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "id_persona",
                table: "usuarios",
                type: "bigint",
                nullable: false,
                defaultValue: 0L)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_usuarios",
                table: "usuarios",
                column: "id_persona");

            migrationBuilder.CreateIndex(
                name: "IX_prestamos_id_persona",
                table: "prestamos",
                column: "id_persona");

            migrationBuilder.AddForeignKey(
                name: "FK_prestamos_usuarios_id_persona",
                table: "prestamos",
                column: "id_persona",
                principalTable: "usuarios",
                principalColumn: "id_persona",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
