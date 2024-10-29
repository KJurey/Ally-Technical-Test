# Ally Technical Test

## Ally Technical Test es una prueba técnica desarrollada para mostrar mi conjunto de habilidades. Es un sitio web el cual es un panel de control construido usando HTML, CSS, React, NextJS y Typescript.

**Instalación**
Como este proyecto fue desarrollado usando React 18 con el framework NextJS 15, necesitas tener Node.js instalado en tu sistema. Para instalar el proyecto, sigue estos pasos:

1. Clona este repositorio en tu máquina local usando:

`git clone https://github.com/KJurey/Ally-Technical-Test.git`

2. Navega al directorio del proyecto:

`cd dashboard-frontend`

3. Instala las dependencias usando npm:

`npm install`

Para ejecutar el proyecto localmente, utilice el siguiente comando:

`npm run dev`

Esto iniciará el servidor de desarrollo, y podrá ver el sitio web en su navegador en http://localhost:3000.

### Estructura del proyecto (Front-End)

El proyecto se divide en diferentes carpetas dentro de `src`:

- Public
  -Esta carpeta contiene Assets Estáticos.
  - App
    -Esta carpeta contiene toda la estructura de archivos y carpetas de la app de NextJS, utiliza el App Router de este mismo.
    - Api
      -Esta carpeta contiene API Endpoints que se administran con NextJS, necesarios para el funcionamiento de la app.
    - Dashboard
      -Esta carpeta contiene dos rutas utilizadas en este proyecto dashboard/weather y dashboard/users.
    - Login
      -Esta carpeta contiene la ruta de inicio de sesión /login.
  - Components
    -Esta carpeta contiene componentes de react de la UI.
  - Containers
    -Esta carpeta contiene contenedores de pagina para los componentes de React de UI.
  - Contexts
    -Esta carpeta contiene los contextos utilizados de Context API, el cual es el de autenticación de usuario.
  - Hooks
    -Esta carpeta contiene custom hooks de React.
  - Services
    -Esta carpeta contiene funcionalidades y servicios que utiliza la app.
  - Types
    -Esta carpeta contiene los tipos de Typescript utilizados en la app.

### Estructura del proyecto (Back-End)

La carpeta llamada project-root contiene la estructura del Back-End, este ultimo fue realizado con NodeJS junto con una base de datos
PostgreSQL y Prisma ORM. Desplegada en servicios de AWS.

El archivo `index.js` contiene la logica principal del manejo de HTTP Requests.

- Handlers
  -Esta carpeta contiene los handlers para operaciones con la base de datos.
- Lib
  -Esta carpeta contiene utilidad para Prisma.
- Prisma
  -Esta carpeta contiene la estructura del schema de Prisma.
- Services
  -Esta carpeta contiene funcionalidades y servicios que utiliza la app.

### Para iniciar sesión ingresa los siguientes datos

- Email: newuser@example.com
- Password: password123

#### Uso

En primera instancia es necesario iniciar sesión con el usuario brindado o, por el contrario, crear un nuevo usuario. En cualquiera de los casos cada campo tiene que estar completo, de lo contrario no se podrá acceder a la aplicación, inclusive al ingresar directamente las rutas conocidas, ya que, se redirigirá a la página de /login como método de protección. Una vez iniciada la sesión se guardará la autenticación en el cliente y, por lo tanto, se podrá navegar libremente a través del dashboard. De primera instancia podemos ver la ventana de clima en donde tendremos diferentes tarjetas que nos proporcionara información acerca del clima y hora de un país seleccionado, inicialmente no se mostrara ninguna información, esto cambiara hasta que el usuario seleccione un país, posteriormente podrá seleccionar una zona horaria para desplegar toda la información del dashboard. En cualquier momento el usuario podrá cambiar de zona horaria o de región. En la segunda ventana tendremos la cantidad total de usuarios que existen actualmente en la base de datos, el usuario podrá visualizar estos mismos sin orden o podrá ordenarlos seleccionando el botón de sorteo, el orden de usuarios cambiará dependiendo el campo seleccionado. Finalmente, el usuario podrá seleccionar cualquier número de usuarios para posteriormente descargar su información en formato CSV utilizando el botón CSV correspondiente en la cabecera.

#### El código en su totalidad fue realizado por Kevin Juárez Reynoso y conserva todos los derechos correspondientes.
