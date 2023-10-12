using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gestion_inventario.Migrations
{
    /// <inheritdoc />
    public partial class addtabletipopersonafixerrors : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "id_credencial",
                table: "Persona",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "id_tipo_persona",
                table: "Persona",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "tipos_personas",
                columns: table => new
                {
                    id_tipo_persona = table.Column<int>(type: "int", nullable: false),
                    varchar50 = table.Column<string>(name: "varchar(50)", type: "nvarchar(50)", maxLength: 50, nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipos_personas", x => x.id_tipo_persona);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Persona_id_tipo_persona",
                table: "Persona",
                column: "id_tipo_persona");

            migrationBuilder.AddForeignKey(
                name: "FK_Persona_tipos_personas_id_tipo_persona",
                table: "Persona",
                column: "id_tipo_persona",
                principalTable: "tipos_personas",
                principalColumn: "id_tipo_persona",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Persona_tipos_personas_id_tipo_persona",
                table: "Persona");

            migrationBuilder.DropTable(
                name: "tipos_personas");

            migrationBuilder.DropIndex(
                name: "IX_Persona_id_tipo_persona",
                table: "Persona");

            migrationBuilder.DropColumn(
                name: "id_credencial",
                table: "Persona");

            migrationBuilder.DropColumn(
                name: "id_tipo_persona",
                table: "Persona");
        }
    }
}
