# API de Recetarios Gastronómicos

## Descripción

API REST desarrollada con Node.js y Express para la gestión de recetarios gastronómicos.

El sistema permite administrar alumnos, recetarios y recetas, proporcionando operaciones CRUD mediante una arquitectura basada en controladores y rutas. La documentación de la API se encuentra disponible mediante Swagger UI.


## Tecnologías utilizadas

- Node.js
- Express.js
- MySQL
- Sequelize
- Swagger UI Express
- dotenv
- cors


## Estructura del proyecto

src/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
└── app.js

package.json
server.js
README.md


## Instalación

### 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

### 2. Entrar al proyecto
cd nombre-del-proyecto

### 3. Instalar dependencias
npm install

---

## Configuración

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo de contenido:
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=recetario_gastronomia

---

## Ejecutar el servidor

sudo service mysql start

node server.js

---

## Documentación Swagger

Una vez iniciado el servidor utilizando GitHub Codespaces, acceder a:
https://TU-CODESPACE-3000.app.github.dev/doc

---

## Endpoints disponibles

### Alumnos

| Método | Endpoint                 | Descripción               |
|--------|--------------------------|---------------------------|
| GET    | /api/alumnos             | Obtener todos los alumnos |
| POST   | /api/alumnos/registro    | Registrar alumno          |
| POST   | /api/alumnos/login       | Iniciar sesión            |
| GET    | /api/alumnos/perfil/{id} | Obtener perfil            |

---

### Recetarios

| Método | Endpoint             | Descripción          |
|--------|----------------------|----------------------|
| GET    | /api/recetarios      | Listar recetarios    |
| POST   | /api/recetarios      | Crear recetario      |
| GET    | /api/recetarios/{id} | Obtener recetario    |
| PUT    | /api/recetarios/{id} | Actualizar recetario |
| DELETE | /api/recetarios/{id} | Eliminar recetario   |

---

### Recetas

| Método | Endpoint                                            | Descripción               |
|--------|-----------------------------------------------------|---------------------------|
| GET    | /api/recetarios/{id_recetario}/recetas              | Listar recetas            |
| POST   | /api/recetarios/{id_recetario}/recetas              | Crear receta              |
| GET    | /api/recetarios/{id_recetario}/recetas/{id_receta}  | Obtener receta            |
| GET    | /api/recetarios/{id_recetario}/recetas/global/todas | Obtener todas las recetas |

---

## Códigos de respuesta

| Código | Significado                  |
|--------|------------------------------|
| 200    | Solicitud exitosa            |
| 201    | Recurso creado correctamente |
| 400    | Solicitud inválida           |
| 404    | Recurso no encontrado        |
| 500    | Error interno del servidor   |

---

## Autor

Desarrollado como proyecto académico para la carrera de TSU en Desarrollo de Software Multiplataforma 