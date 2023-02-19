# {APP NAME}: Una aplicación de {APP FUNCTIONALITY} creada usando el Stack MERN

# Aplicación desplegada

La aplicación desplegada se puede encontrar en el siguiente enlace: "{ENLACE APP DESPLEGADA}". A nivel estético, la aplicación ha sido desarrollada desde una perspectiva mobile-first. 

Si quiere correrse esta aplicación en local, será necesario crear un archivo .env en la raíz del proyecto y adjuntar la variable de entorno "REACT_APP_API_URL". Por defecto, nos servimos del valor "http://localhost:5005". El puerto 5005 es el elegido en este caso para levantar nuestro servicio (API). Este archivo .env se excluye de subida en nuestro archivo .gitignore.

Para instalar todas las dependencias utilizadas en el proyecto, simplemente se ha de ejecutar el comando:
```
npm install
```
# Auth de la Aplicación

Para acceder a la aplicación y sus funcionalidades, es necesario iniciar sesión. El usuario más usado en la plataforma y con más fotos/amigos tiene por correo: "goblin@gmail.com" y contraseña "1234". 

# Rutas de la aplicación:

| URL path                    | Description           | 
| :--------------------------:|:---------------------:|
| /                       |  Home page            | 
| /search                      |  Search any Youtube channel          |
| /search/:channel_id                      |  Youtube Channel Videos          |
| /dashboard/:channel_id                      |  YT Channel Dashboard          |
| /my-profile                 |  Logged User information and Personal Photos     |
| /signup                   |  Sign up page         |
| /login                      |  Login page only visible to Admin          |