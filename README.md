//Estudiante: Mario Roberto Rompich Yoc 9490-17-17052

//Descripcion: 
Se elige una arquitectura de Estado Global
Opción A: Context API + useReducer
Se crea un proveedor centralizado (AuthProvider) que encapsule el useReducer.
Se define un estado inicial con algunas propiedades.
se implementa un reducer que gestione como mínimo 4 acciones considerando:
LOGIN: Almacena la información del usuario y actualiza isAuthenticated a true.
LOGOUT: Limpia los datos de sesión y restablece isAuthenticated a false.
Se expone el estado y la función de despacho mediante Hooks personalizados.

//Enlace de sitio web publicado: https://tiendaenlinea-frontendv2.netlify.app/

## Conexión con el backend

React consume la API configurada en `VITE_API_URL`, definida en el `.env` raíz
para desarrollo local como `http://localhost:5000`. El cliente agrega `/api`
automáticamente; también admite una URL configurada que ya termine en `/api`.
En Render, se configuro `VITE_API_URL` como la URL pública `https://tarea4-backend-api.onrender.com/` en las variables de entorno de
compilación del frontend.

Las solicitudes pasan por la instancia Axios centralizada en `src/api/axios.js`,
que agrega automáticamente el JWT guardado en la sesión al encabezado
`Authorization`. `AuthProvider` comparte el token y el usuario entre los
componentes, y cierra la sesión local cinco minutos después del inicio de
sesión; el backend sigue validando la vigencia real del JWT.
El formulario inicia sesión mediante `POST /auth/login` y vuelve a la página
principal de la tienda al autenticarse correctamente.
El interceptor global de respuestas cierra la sesión y muestra un aviso en el
login cuando una solicitud protegida recibe un `401`. También programa el
cierre local al llegar a `expiresAt`; la expiración efectiva sigue siendo
validada por el backend.

Las vistas de inicio, catálogo, detalle de producto y perfil están protegidas
por `ProtectedRoute`. Las rutas del frontend usan React Router y redirigen al
login si no hay sesión local; esto no sustituye la validación JWT del backend.

Repositorio: https://github.com/MRobertoUMG/TiendaEnLineaReact/tree/Tarea4

Frontend: https://github.com/MRobertoUMG/TiendaEnLineaReact/tree/Tarea5

Backend: https://tarea4-backend-api.onrender.com/


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

 
