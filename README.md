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

//Enlace de sitio web publicado: https://tiendaenlineareactv3.netlify.app/

## Conexión con el backend

React consume la API configurada en `VITE_API_URL`, definida en el `.env` raíz
para desarrollo local como `http://localhost:5000`. El cliente agrega `/api`
automáticamente; también admite una URL configurada que ya termine en `/api`.
En Render, configura `VITE_API_URL` como la URL pública del servicio backend
(por ejemplo, `https://tu-backend.onrender.com`) en las variables de entorno de
compilación del frontend.

El inicio de sesión y el registro usan `/auth/login` y `/auth/register`; el
catálogo y el detalle consultan `/recursos` y `/recursos/:id`. La búsqueda del
catálogo filtra por nombre con el parámetro `?buscar=termino`. Los productos
deben estar guardados en MongoDB para aparecer en la tienda.