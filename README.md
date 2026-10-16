//Estudiante: Mario Roberto Rompich Yoc 9490-17-17052

//Descripcion: 
Backend: Se implementó JWT en el endpoint POST /api/auth/login, configurando una expiración de 5 minutos mediante expiresIn: "5m". Un middleware verifica la firma y vigencia del token en las rutas protegidas, devolviendo 401 Unauthorized cuando es inválido o ha expirado.

Frontend: Se configuró Axios para enviar automáticamente el token en el encabezado Authorization: Bearer <token>. Un interceptor detecta los errores 401, elimina los datos de sesión, actualiza el estado de autenticación, muestra un mensaje de expiración y redirige al usuario a /login mediante React Router.

//Enlace de sitio web publicado: https://tiendaenlinea-frontendv2.netlify.app/

Repositorio: https://github.com/MRobertoUMG/TiendaEnLineaReact/tree/Tarea4

Frontend: https://github.com/MRobertoUMG/TiendaEnLineaReact/tree/Tarea5

Backend: https://tarea5-backend-api.onrender.com/


//JSON SOLICITA PARA PRUEBAS//
{
  "info": {
    "name": "Tarea5 - Autenticación JWT",
    "description": "Pruebas de login, acceso protegido con Bearer Token y rechazo de token expirado. Ajusta baseUrl, las credenciales, los campos del login y la ruta protegida a tu proyecto.",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    },
    {
      "key": "token",
      "value": ""
    }
  ],
  "item": [
    {
      "name": "1 - Login: obtener token",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"usuario@ejemplo.com\",\n  \"password\": \"tu_password\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "{{baseUrl}}/api/auth/login",
          "host": [
            "{{baseUrl}}"
          ],
          "path": [
            "api",
            "auth",
            "login"
          ]
        },
        "description": "Cambia email/password por los campos reales que espera tu backend."
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [
              "if (pm.response.code === 200) {",
              "  const data = pm.response.json();",
              "  const token = data.token || data.accessToken || (data.data && data.data.token);",
              "  if (token) pm.collectionVariables.set('token', token);",
              "}",
              "pm.test('Login responde 200 OK', function () { pm.response.to.have.status(200); });"
            ]
          }
        }
      ]
    },
    {
      "name": "2 - Endpoint protegido: token válido",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/api/protected",
          "host": [
            "{{baseUrl}}"
          ],
          "path": [
            "api",
            "protected"
          ]
        },
        "description": "Reemplaza /api/protected por la ruta protegida real de tu aplicación."
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [
              "pm.test('El token válido permite el acceso', function () { pm.response.to.have.status(200); });"
            ]
          }
        }
      ]
    },
    {
      "name": "3 - Endpoint protegido: token expirado",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/api/protected",
          "host": [
            "{{baseUrl}}"
          ],
          "path": [
            "api",
            "protected"
          ]
        },
        "description": "Ejecuta después de esperar más de 5 minutos desde el login. No vuelvas a ejecutar Login antes de esta prueba."
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [
              "pm.test('El token expirado es rechazado con 401', function () { pm.response.to.have.status(401); });"
            ]
          }
        }
      ]
    }
  ]
}