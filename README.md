# 🏗️ Gestor de Muelles Logísticos

Aplicación web para **gestionar reservas, asignaciones y disponibilidad** de muelles en una empresa logística.

## 🧩 Stack
- **Frontend:** Angular
- **Backend:** .NET Core (API REST, Entity Framework)
- **DB:** SQL Server

## ✨ Funcionalidades
- 🔐 Autenticación de usuarios (roles)
- 📅 CRUD de reservas
- 🧭 Vista de disponibilidad en tiempo real
- 📊 Reporte básico de ocupación

## 📂 Estructura del repo

gestor-muelles-logisticos/

├── frontend/ → Aplicación Angular (interfaz de usuario)

├── backend/ → API REST .NET Core (lógica de negocio + conexión a BD)

├── db/ → Scripts SQL (schema y datos de prueba)

├── docs/ → Documentación y diagramas

├── .gitignore

└── README.md

## 🚀 Puesta en marcha

### 1) Backend (.NET)
bash
cd frontend
npm install
ng serve -o

### 2) Base de datos (SQL Server)
Importar db/schema.sql para crear tablas.

### 3) Frontend (Angular)
cd frontend
npm install
ng serve -o

Aplicación disponible en: http://localhost:4200

## 🧪 Usuarios de prueba

- **Sofía (Usuario)**  
  - Email: `sofia@example.com`  
  - Password: `sofia123`  

- **Carlos (Operario)**  
  - Email: `carlos@example.com`  
  - Password: `carlos123`  

- **Laura (Administrador)**  
  - Email: `laura@example.com`  
  - Password: `laura456`  

## 🗂️ Documentacion
[LogistiXperts(Documentacion)](https://github.com/alexbco/gestor-muelles-logisticos/blob/Main/docs/documentacion.pdf)
## 💡 Aprendizajes

Integración Angular ↔️ .NET con autenticación JWT.

Uso de Entity Framework Core para la gestión de la base de datos.

Buenas prácticas en la organización de componentes y servicios en Angular.

