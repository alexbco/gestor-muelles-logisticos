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

/frontend/ → Angular
/api/ → .NET Web API
/db/ → scripts SQL (schema, seed)
/docs/ → diagramas, arquitectura
/screenshots/→ capturas para el README

## 🚀 Puesta en marcha

### 1) Backend (.NET)
bash
cd api
dotnet restore
dotnet run

### 2) Base de datos (SQL Server)
Importar db/schema.sql para crear tablas.

### 3) Frontend (Angular)
cd frontend
npm install
ng serve -o

Aplicación disponible en: http://localhost:4200

## 🧪 Usuarios de prueba
- Administrador: admin@demo.com / 1234

- Usuario: user@demo.com / 1234
- (cámbialos si tienes otros credenciales de prueba)

## 📷 Capturas

## 💡 Aprendizajes

Integración Angular ↔️ .NET con autenticación JWT.

Uso de Entity Framework Core para la gestión de la base de datos.

Buenas prácticas en la organización de componentes y servicios en Angular.

