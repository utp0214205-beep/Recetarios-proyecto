CREATE DATABASE recetario_gastronomia;
USE recetario_gastronomia;

CREATE TABLE alumno (
    id_alumno INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL
);


CREATE TABLE recetario (
    id_recetario INT AUTO_INCREMENT PRIMARY KEY,
    id_alumno INT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    fecha_creacion DATE NOT NULL,

    FOREIGN KEY(id_alumno)
        REFERENCES alumno(id_alumno)
);


CREATE TABLE receta (
    id_receta INT AUTO_INCREMENT PRIMARY KEY,
    id_recetario INT NOT NULL,

    asignatura VARCHAR(100),
    clasificacion VARCHAR(100),
    nombre_platillo VARCHAR(150) NOT NULL,
    fecha DATE,
    numero_practica INT,

    tiempo_preparacion VARCHAR(50),

    total_produccion DECIMAL(10,3),

    numero_porciones INT,

    cantidad_porcion VARCHAR(50),

    aporte_nutrimental VARCHAR(100),

    metodo_tiempo_conservacion VARCHAR(150),

    maridaje VARCHAR(150),
    
    costo_total DECIMAL(10,2),

    costo_por_porcion DECIMAL(10,2),

    FOREIGN KEY(id_recetario)
        REFERENCES recetario(id_recetario)
);


CREATE TABLE ingrediente (
    id_ingrediente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL UNIQUE
);


CREATE TABLE ingrediente_receta (

    id_ingrediente_receta INT AUTO_INCREMENT PRIMARY KEY,

    id_receta INT NOT NULL,

    id_ingrediente INT NOT NULL,

    cantidad DECIMAL(10,3),

    unidad VARCHAR(20),

    costo_unitario DECIMAL(10,2),

    rendimiento DECIMAL(5,2),

    importe DECIMAL(10,2),

    FOREIGN KEY(id_receta)
        REFERENCES receta(id_receta),

    FOREIGN KEY(id_ingrediente)
        REFERENCES ingrediente(id_ingrediente)
);


CREATE TABLE procedimiento (

    id_procedimiento INT AUTO_INCREMENT PRIMARY KEY,

    id_receta INT NOT NULL,

    mise_en_place TEXT,

    instrucciones TEXT,

    FOREIGN KEY(id_receta)
        REFERENCES receta(id_receta)
);


CREATE TABLE tecnica_culinaria (

    id_tecnica INT AUTO_INCREMENT PRIMARY KEY,

    id_receta INT NOT NULL,

    tipo_corte VARCHAR(150),

    metodo_coccion VARCHAR(150),

    tecnica_elaboracion VARCHAR(150),

    FOREIGN KEY(id_receta)
        REFERENCES receta(id_receta)
);


CREATE TABLE equipo (

    id_equipo INT AUTO_INCREMENT PRIMARY KEY,

    id_receta INT NOT NULL,

    utensilios TEXT,

    temperatura_coccion VARCHAR(50),

    temperatura_servicio VARCHAR(50),

    material_extra TEXT,

    unidades_medicion VARCHAR(100),

    FOREIGN KEY(id_receta)
        REFERENCES receta(id_receta)
);


CREATE TABLE fotografia (

    id_fotografia INT AUTO_INCREMENT PRIMARY KEY,

    id_receta INT NOT NULL,

    imagen TEXT NOT NULL,

    FOREIGN KEY(id_receta)
        REFERENCES receta(id_receta)
);


CREATE TABLE informacion_complementaria (

    id_informacion INT AUTO_INCREMENT PRIMARY KEY,

    id_receta INT NOT NULL,

    historia TEXT,

    conclusiones TEXT,

    buenas_practicas TEXT,

    referencias TEXT,

    FOREIGN KEY(id_receta)
        REFERENCES receta(id_receta)
);
