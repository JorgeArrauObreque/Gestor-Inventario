using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gestion_inventario.Migrations
{
    /// <inheritdoc />
    public partial class userspasswords : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "password",
                table: "usuariosSistema",
                type: "varchar(1000)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "password",
                table: "usuariosSistema");
        }
    }
}
