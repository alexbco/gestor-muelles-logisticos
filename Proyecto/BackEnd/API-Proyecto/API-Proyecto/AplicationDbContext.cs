using Microsoft.EntityFrameworkCore;
using API_Proyecto.Models;
using API_Proyecto.Dtos;

namespace API_Proyecto
{ 
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options): base(options)
        {
        }

        public DbSet<Citas> Citas { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<CitaPedido> CitaPedidos { get; set; }
        public DbSet<MuellesTipoCamion> MuellesTipoCamion { get; set; }
        public DbSet<Perfil> Perfiles { get; set; }
        public DbSet<Franjas> Franjas{ get; set; }
        public DbSet<TipoCamion> TipoCamion { get; set; }
        public DbSet<Muelles> Muelles { get; set; }
        public DbSet<Usuarios> Usuarios { get; set; }
        //views
        //public DbSet<UsuariosPerfiles> V_Usuarios_Perfiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuarios>()
                .HasOne(u => u.Perfil)
                .WithMany()
                .HasForeignKey(u => u.PerfilID);

            modelBuilder.Entity<CitaPedido>().ToTable("CITAS_PEDIDOS");

            modelBuilder.Entity<TipoCamion>().ToTable("TIPO_CAMION");



            //modelBuilder.Entity<CitaPedido>()
            //    .HasOne(cp => cp.Cita)
            //    .WithMany(c => c.CitasPedidos)
            //    .HasForeignKey(cp => cp.CitaID);

            //modelBuilder.Entity<CitaPedido>()
            //    .HasOne(cp => cp.Pedido)
            //    .WithMany(p => p.CitasPedidos)
            //    .HasForeignKey(cp => cp.PedidoID);

            //modelBuilder.Entity<UsuariosPerfiles>().ToView("V_USUARIOS_PERFILES")
            //    .HasNoKey();

        }

    }
}
