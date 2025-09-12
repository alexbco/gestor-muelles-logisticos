export interface Usuario {
    position: number;
    id: number;
    usuario: string;
    password: string;
    perfilID: number;
    email: string;
    perfil: Perfil;
  }
  
  export interface Perfil {
    id: number;
    nombre: string;
  }

  export interface IRegistro {
    Usuario: string;
    Email: string;
    Password: string;
    PerfilID: number;
  }
  
  export interface UsuarioRegistrado {
    id: number;
    usuario: string;
    email: string;
    perfilID: number;
    perfilNombre: string;
  }
  
  export interface UsuarioToken {
    Usuario: string;
    Email: string;
    Perfil: string;
    PerfilID: number;
  }