# Tienda FakeStore

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-12.2.0-red?style=for-the-badge&logo=angular&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-4.6.2-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

Aplicación front-end de ejemplo que consume la API FakeStore y permite navegar productos, filtrarlos, ver detalles y gestionar un carrito de compras.

Tecnologías
- AngularJS 1.8.x
- Bootstrap 5
- Bootstrap Icons
- SweetAlert2 (notificaciones)
- Vanilla JavaScript para lógica de UI y persistencia (localStorage)

Estructura principal
- index.html                -> Interfaz y bindings AngularJS
- js/app.js                 -> Inicialización del módulo Angular
- js/services/tiendaservice.js -> Servicio para consumir la API FakeStore
- js/controllers/tiendaController.js -> Lógica principal (productos, carrito, modales)
- css/styles.css            -> Estilos personalizados

Requisitos
- Navegador moderno (Chrome, Edge, Firefox)
- Conexión a internet para cargar CDNs (o servir las librerías localmente)

Cómo visualizar
El proyecto esta alojado en el Hostring propio de GitHub y se puede ver en el siguiente sitio público:
https://ernestobarrazaudb-dotcom.github.io/TiendaFakeStore/


Notas de uso
- "Ver Detalles" abre un modal con la información del producto cargada desde la API.
- "Agregar al carrito" añade el producto al carrito y actualiza el total y el contador.
- El carrito se persiste en `localStorage` lo que permite mantener tu historial de compras.
- El botón del carrito en la barra superior muestra el número de productos y el monto total.
- Proceso de pago efectivo con ventanas que detallan sobre el proceso


