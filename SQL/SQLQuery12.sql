-- Lote 2: Eliminar las tablas si existen
IF OBJECT_ID('CITAS_PEDIDOS', 'U') IS NOT NULL
    DROP TABLE CITAS_PEDIDOS;
IF OBJECT_ID('PEDIDOS', 'U') IS NOT NULL
    DROP TABLE PEDIDOS;
IF OBJECT_ID('CITAS', 'U') IS NOT NULL
    DROP TABLE CITAS;
IF OBJECT_ID('MUELLES', 'U') IS NOT NULL
    DROP TABLE MUELLES;
IF OBJECT_ID('MUELLES_TIPO_CAMION', 'U') IS NOT NULL
    DROP TABLE MUELLES_TIPO_CAMION;
IF OBJECT_ID('TIPO_CAMION', 'U') IS NOT NULL
    DROP TABLE TIPO_CAMION;
IF OBJECT_ID('USUARIOS', 'U') IS NOT NULL
    DROP TABLE USUARIOS;
IF OBJECT_ID('PERFILES', 'U') IS NOT NULL
    DROP TABLE PERFILES;
IF OBJECT_ID('FRANJAS', 'U') IS NOT NULL
    DROP TABLE FRANJAS;


-- Tabla MUELLES_TIPO_CAMION
CREATE TABLE TIPO_CAMION
(
    ID INT IDENTITY(1, 1) PRIMARY KEY,
    Descripcion VARCHAR(200)
);

-- Tabla MUELLES_TIPO_CAMION
CREATE TABLE MUELLES_TIPO_CAMION
(
    ID INT IDENTITY(1, 1) PRIMARY KEY,
    Descripcion VARCHAR(400)
);

-- Tabla MUELLES
CREATE TABLE MUELLES
(
    ID INT IDENTITY(1, 1) PRIMARY KEY,
    Nombre VARCHAR(50),
    Disponibilidad VARCHAR(50),
    TipoCamionID INT REFERENCES MUELLES_TIPO_CAMION(ID) 
);

-- Tabla FRANJAS
CREATE TABLE FRANJAS
(
    ID INT PRIMARY KEY,
    horaInicio DATETIME,
    horaFinal DATETIME
);

-- Tabla PEDIDOS
CREATE TABLE PEDIDOS
(
    ID INT IDENTITY(1, 1) PRIMARY KEY,
    Mercancia VARCHAR(255),
    Palets INT,
);

-- Tabla CITAS
CREATE TABLE CITAS
(
    ID INT IDENTITY(1, 1) PRIMARY KEY,
    Fecha DATE,
    Usuario VARCHAR(50),
    MuelleID INT REFERENCES MUELLES(ID) NOT NULL,
    FranjaID INT REFERENCES FRANJAS(ID) NOT NULL,
	TipoCamionID INT REFERENCES TIPO_CAMION(ID) NOT NULL,
);

-- Tabla CITAS_PEDIDOS
CREATE TABLE CITAS_PEDIDOS
(
    ID INT IDENTITY(1, 1) PRIMARY KEY,
    CitaID INT REFERENCES CITAS(ID),
    PedidoID INT REFERENCES PEDIDOS(ID)
);


-- Tabla PERFILES
CREATE TABLE PERFILES
(
    ID INT IDENTITY(1, 1) PRIMARY KEY,
    Nombre VARCHAR(50)
);

-- Tabla USUARIOS
CREATE TABLE USUARIOS
(
    ID INT IDENTITY(1, 1) PRIMARY KEY,
    Usuario VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    PerfilID INT REFERENCES PERFILES(ID) NOT NULL,
    Email VARCHAR(255) NOT NULL
);


-- Introducir valores de ejemplo en MUELLES_TIPO_CAMION
INSERT INTO MUELLES_TIPO_CAMION (Descripcion) VALUES 
		('Solo permite la descarga de camiones pequenos y furgonetas.'), ('Admite la descarga de todo tipo de vehiculos.');


-- Introducir valores en la tabla MUELLES
INSERT INTO MUELLES (Nombre, Disponibilidad, TipoCamionID) VALUES 
		('Muelle 1', 'Activo', 1),
		('Muelle 2', 'Activo', 2),
		('Muelle 3', 'Activo', 2),
		('Muelle 4', 'Inactivo', 2),
		('Muelle 5', 'Activo', 2);

INSERT INTO TIPO_CAMION(Descripcion)
VALUES ('Furgoneta'), ('Camion'), ('Trailer');

-- Introducir valores en la tabla PERFILES
INSERT INTO PERFILES (Nombre) VALUES 
		('Administrador'),
		('Operario'),
		('Usuario');


-- Introducir valores en la tabla FRANJAS
INSERT INTO FRANJAS (ID, horaInicio, horaFinal) VALUES
		(1, '08:00:00', '10:00:00'),
		(2, '10:00:00', '12:00:00'),
		(3, '12:00:00', '14:00:00'),
		(4, '14:00:00', '16:00:00'),
		(5, '16:00:00', '18:00:00'),
		(6, '18:00:00', '20:00:00');


-- Introducir valores en la tabla CITAS
INSERT INTO CITAS (Fecha, FranjaID, Usuario, MuelleID, TipoCamionID) VALUES
		('2023-06-23', 5, 'Miguel', 2, 3),
		('2023-06-23', 6, 'Sofia', 3, 1),
		('2023-06-23', 1, 'Juan', 3, 2),
		('2023-06-23', 2, 'Miguel', 2, 3),
		('2023-06-24', 3, 'Maria', 1, 1),
		('2023-06-24', 4, 'Luis', 2, 2),
		('2023-06-24', 5, 'Pedro', 3, 3),
		('2023-06-24', 6, 'Sofia', 2, 1),
		('2023-06-25', 1, 'Juan', 1, 2),
		('2023-06-25', 2, 'Miguel', 2, 3),
		('2023-06-25', 3, 'Maria', 3, 1),
		('2023-06-25', 4, 'Luis', 1, 2),
		('2023-06-26', 5, 'Miguel', 2, 3),
		('2023-06-26', 6, 'Sofia', 3, 1),
		('2023-06-26', 1, 'Miguel', 3, 2),
		('2023-06-26', 2, 'Ana', 2, 3),
		('2023-06-27', 3, 'Maria', 1, 1),
		('2023-06-27', 4, 'Luis', 2, 2),
		('2023-06-27', 5, 'Pedro', 3, 3),
		('2023-06-27', 6, 'Sofia', 2, 1),
		('2023-06-28', 1, 'Juan', 1, 2),
		('2023-06-28', 2, 'Miguel', 2, 3),
		('2023-06-28', 3, 'Maria', 3, 1),
		('2023-06-28', 4, 'Miguel', 1, 2),
		('2023-06-29', 5, 'Pedro', 2, 3),
		('2023-06-29', 6, 'Sofia', 3, 1),
		('2023-06-07', 1, 'Miguel', 3, 2),
		('2023-06-06', 3, 'Maria', 1, 1),
		('2023-06-06', 4, 'Miguel', 2, 2),
		('2023-06-05', 5, 'Pedro', 3, 3),
		('2023-06-05', 6, 'Sofia', 2, 2),
		('2023-06-29', 6, 'Pedro', 3, 3),
		('2023-06-29', 5, 'Miguel', 3, 3),
		('2023-06-30', 6, 'Miguel', 3, 3),
		('2023-06-30', 5, 'Pedro', 3, 3);



-- Introducir valores en la tabla CITAS_PEDIDOS
-- Introducir valores en la tabla PEDIDOS
INSERT INTO PEDIDOS (Mercancia, Palets) VALUES 
		('Zapatillas Nike', 4),
		('Gorras new ERA', 2),
		('Frutas Mercadona', 3),
		('Televisor Samsung', 1),
		('Ropa Deportiva', 5),
		('Consola PlayStation', 2),
		('Libros de FantasIa', 3),
		('ArtIculos de Cocina', 4),
		('Juguetes Infantiles', 2),
		('Productos de Limpieza', 3),
		('Electrodomesticos', 4),
		('Muebles de Oficina', 1),
		('Accesorios para Autos', 2),
		('Instrumentos Musicales', 3),
		('Joyas y Bisuteria', 1),
		('Ropa de Moda', 5),
		('Zapatos Adidas', 3),
		('Camisetas Polo', 4),
		('Muebles de Hogar', 2),
		('Instrumentos Electronicos', 3),  
		('Relojes', 2),
		('Bolsos', 3),
		('Juguetes', 4),
		('Ropa de Invierno', 2),
		('Electrodomesticos', 3),
		('Herramientas', 4),
		('Maletas', 2),
		('Joyas', 3),
		('Productos de Belleza', 4),
		('Libros de Cocina', 2),
		('Instrumentos Musicales', 3),
		('Articulos Deportivos', 4),
		('Juguetes Educativos', 2),
		('Muebles de Jardin', 3),
		('Productos para Mascotas', 4),
		('Equipo de Camping', 2),
		('Material de Oficina', 3),
		('Accesorios para Celulares', 4);

INSERT INTO USUARIOS (Usuario, Password, PerfilID, Email)
VALUES ('Juan', '1234klk321', 1, 'juan@admin.com'),
       ('Monica', 'monicatropical', 1, 'monica@tropical.com'),
       ('Ana', '5678', 2, 'ana@example.com'),
       ('Pedro', 'abcd', 3, 'pedro@example.com'),
       ('Raul', '8910', 2, 'raul@example.com'),
       ('Sara', '1234klk321', 2, 'sara@operario.com'),
       ('Luis', 'luis456', 1, 'luis@example.com'),
       ('Maria', 'maria789', 3, 'maria@example.com'),
       ('Luis', 'password123', 1, 'luis@example.com'),
       ('Sofia', 'sofia123', 3, 'sofia@example.com'),
       ('Carlos', 'carlos123', 2, 'carlos@example.com'),
       ('Laura', 'laura456', 1, 'laura@example.com'),
       ('Miguel', '1234klk321', 3, 'miguel@usuario.com'),
       ('Elena', 'elena123', 2, 'elena@example.com'),
       ('Diego', 'diego456', 1, 'diego@example.com'),
       ('Isabel', 'isabel789', 3, 'isabel@example.com'),
       ('Javier', 'javier123', 2, 'javier@example.com'),
       ('Lorena', 'lorena456', 1, 'lorena@example.com'),
       ('Pablo', 'pablo789', 3, 'pablo@example.com'),
       ('Carmen', 'carmen123', 2, 'carmen@example.com'),
       ('Daniel', 'daniel456', 1, 'daniel@example.com'),
       ('Lucia', 'lucia789', 3, 'lucia@example.com');


-- Obtener la lista de citas sin pe-- Obtener la lista de citas sin pedidos asociados
WITH CitasSinPedido AS (
    SELECT C.ID
    FROM CITAS C
    LEFT JOIN CITAS_PEDIDOS CP ON C.ID = CP.CitaID
    WHERE CP.CitaID IS NULL
)
-- Insertar cuatro pedidos aleatorios asociados a cada cita sin pedidos
INSERT INTO CITAS_PEDIDOS (CitaID, PedidoID)
SELECT CS.ID, P.ID
FROM CitasSinPedido CS
CROSS APPLY (
    SELECT TOP 4 ID
    FROM PEDIDOS
    ORDER BY NEWID() -- Orden aleatorio
) P;