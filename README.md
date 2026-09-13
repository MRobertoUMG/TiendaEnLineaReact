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