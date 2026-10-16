//Estudiante: Mario Roberto Rompich Yoc 9490-17-17052

//Descripcion: 
Backend: Se implementó JWT en el endpoint POST /api/auth/login, configurando una expiración de 5 minutos mediante expiresIn: "5m". Un middleware verifica la firma y vigencia del token en las rutas protegidas, devolviendo 401 Unauthorized cuando es inválido o ha expirado.

Frontend: Se configuró Axios para enviar automáticamente el token en el encabezado Authorization: Bearer <token>. Un interceptor detecta los errores 401, elimina los datos de sesión, actualiza el estado de autenticación, muestra un mensaje de expiración y redirige al usuario a /login mediante React Router.

//Enlace de sitio web publicado: https://tiendaenlinea-frontendv2.netlify.app/

Repositorio: https://github.com/MRobertoUMG/TiendaEnLineaReact/tree/Tarea4

Frontend: https://github.com/MRobertoUMG/TiendaEnLineaReact/tree/Tarea5

Backend: https://tarea5-backend-api.onrender.com/


POST

/api/auth/register

Registrar un usuario

POST

/api/auth/login

Iniciar sesión

El registro y el inicio de sesión devuelven un token JWT. Todas las rutas de
`/api/recursos` y `/api/productos` requieren enviar ese token en el encabezado
`Authorization: Bearer <token>`. Las rutas de registro e inicio de sesión
permanecen públicas para permitir obtener el token.

GET

/api/recursos

Listar recursos

GET

/api/recursos/:id real que devuelve MongoDB.

Consultar un recurso

POST

/api/recursos

Crear un recurso

PUT

/api/recursos/:id real que devuelve MongoDB.

Actualizar un recurso

DELETE

/api/recursos/:id real que devuelve MongoDB.

Eliminar un recurso


Payloads de ejemplo
Para registro, se utiliza POST /api/auth/register con este cuerpo JSON:

json
{
  "nombreCompleto": "Ricardo Pérez",
  "correo": "ricardo.prueba@example.com",
  "password": "ClavePrueba123",
  "rol": "cliente"
}

Para iniciar sesión, utiliza POST /api/auth/login:

json
{
  "correo": "ricardo.prueba@example.com",
  "password": "ClavePrueba123"
}

Para crear un recurso, se utiliza POST /api/recursos:

json
{
  "nombre": "Bocina inalámbrica",
  "descripcion": "Bocina Bluetooth portátil",
  "precio": 230,
  "categoria": "Electrónica",
  "imagen": "https://static.kemikcdn.com/2026/07/JBLGO5REDAM-1200x1200-001.-700x700.jpg",
  "especificaciones": ["Conexión inalámbrica"]
}

Para buscar por nombre, la API admite el parámetro buscar:

GET /api/recursos?buscar=bocina
Para consultar, actualizar o eliminar, se sustituye ID_DEL_RECURSO por el _id real que devuelve MongoDB.

GET    /api/recursos/ID_DEL_RECURSO
PUT    /api/recursos/ID_DEL_RECURSO
DELETE /api/recursos/ID_DEL_RECURSO

En la actualización PUT, se envía un JSON con los campos que requiera el modelo, por ejemplo:

json
{
  "nombre": "Bocina inalámbrica actualizada",
  "descripcion": "Bocina Bluetooth portátil",
  "precio": 300,
  "categoria": "Electrónica"
}

Arquitectura de carpetas del backend 
backend/

    config/
        Conexión con MongoDB Atlas mediante Mongoose.

    models/
        Esquemas y modelos de la base de datos.

    controllers/
        Lógica de registro, login y operaciones CRUD.

    routes/
        Define las rutas HTTP de la API.

    js
        Configura Express, CORS, rutas y el puerto.

    .env
            Variables de entorno privadas; no se sube a GitHub.

 
