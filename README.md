# MGTC: Una aplicación de búsqueda de contenidos en Youtube creada usando el Stack MERN

# Aplicación desplegada

La aplicación desplegada se puede encontrar en el siguiente enlace: **https://yt-client.vercel.app/**. A nivel estético, la aplicación ha sido desarrollada desde una perspectiva mobile-first y responsive. 

Si quiere correrse esta aplicación en local, será necesario crear un archivo .env en la raíz del proyecto y adjuntar la variable de entorno "REACT_APP_API_URL". Por defecto, nos servimos del valor "http://localhost:5005". El puerto 5005 es el elegido en este caso para levantar nuestro servicio (API). 

Para instalar todas las dependencias utilizadas en el proyecto, simplemente se ha de ejecutar el comando:
```
npm install
```
# Auth de la Aplicación

Para acceder a la aplicación y sus funcionalidades, es necesario iniciar sesión como CEO, que es el administrador. Ya que por defecto el usuario creado desde el signup es un usuario normal, se debe entrar con el usuario **ceo@ravenloop.com** y contraseña **hola123**. Es **importante** entrar con este usuario, porque es el único que tiene permiso para acceder a las rutas de búsqueda de contenidos

# Rutas de la aplicación:

| URL path                    | Description           | 
| :--------------------------:|:---------------------:|
| /                       |  Home page            | 
| /search                      | Busca cualquier canal de youtube         |
| /videos/:videosSrc                     |  Lista de vídeos de un canal concreto         |
| /search/:id                     |  Canal con sus respectivos vídeos         |
| /dashboard/:id                      |  YT Channel Dashboard          |
| /my-profile                 |  Perfil del usuario (solo puede acceder el CEO) con su historial de búsquedas     |
| /signup                   |  Sign up page         |
| /login                      |  Login page          |
