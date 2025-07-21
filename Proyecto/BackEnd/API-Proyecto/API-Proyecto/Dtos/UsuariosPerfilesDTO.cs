namespace API_Proyecto.Dtos
{
    public class UsuariosPerfilesDTO
    {
        public class Perfil
        {
            public int ID { get; set; }
            public string Nombre { get; set; }
        }

        public class Usuarios
        {
            public int ID { get; set; }
            public string Usuario { get; set; }
            public string Password { get; set; }
            public int PerfilID { get; set; }
            public string Email { get; set; }

            public Perfil Perfil { get; set; }
        }

    }
}
