using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace coremanage.Data.Storage.Migrations
{
    public partial class IdentityServerDbContext3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NewField2",
                table: "Tenants",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NewField3",
                table: "Tenants",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NewField4",
                table: "Tenants",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NewField2",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "NewField3",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "NewField4",
                table: "Tenants");
        }
    }
}
