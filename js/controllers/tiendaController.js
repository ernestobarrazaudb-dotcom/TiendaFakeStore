// Controlador para la tienda
// Maneja todos los aspectos relacionados con la visualización de productos, categorías, gestión del carrito y procesamiento de pagos
app.controller('TiendaController', ['$scope', 'tiendaService', function ($scope, tiendaService) {
    $scope.productos = [];
    $scope.categorias = [];
    // Inicializar carrito desde localStorage (compatibilidad con distintas claves)
    $scope.carrito = JSON.parse(localStorage.getItem('carrito')) || JSON.parse(localStorage.getItem('carrito_tienda')) || [];
    $scope.searchText = '';
    $scope.selectedCategory = '';

    // Filtro de búsqueda personalizado: busca únicamente en el título (case-insensitive)
    $scope.searchFilter = function(prod) {
        if (!$scope.searchText || $scope.searchText.trim() === '') return true;
        var q = $scope.searchText.toLowerCase();
        var title = (prod.title || '').toString().toLowerCase();
        return title.indexOf(q) !== -1;
    };

    // Función para filtrar productos por categoría
    tiendaService.obtenerProductos().then(function(data) {
        $scope.productos = data;
    }).catch(function(error) {
        console.error("Error al cargar productos:", error);
    });

    // Función para cargar categorías
    tiendaService.obtenerCategorias().then(function(data) {
        $scope.categorias = data;
    }).catch(function(error) {
        console.error("Error al cargar categorías:", error);
    });

    // Producto seleccionado para mostrar en el modal de detalles
    $scope.productoSeleccionado = null;

    // Abre el modal y carga la información del producto seleccionado
    $scope.verDetalles = function(producto) {
        $scope.productoSeleccionado = producto;

        // Mostrar el modal de detalles usando Bootstrap 5
        var modal = new bootstrap.Modal(document.getElementById('modalDetalles'));
        modal.show();
    };

    // Agrega productos al carrito y controla si ya existen
    $scope.agregarAlCarrito = function(producto) {
        var productoExistente = $scope.carrito.find(function(item) {
            return item.id === producto.id;
        });

        // Si el producto ya existe, incrementamos la cantidad, sino lo agregamos con cantidad 1
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            producto.cantidad = 1;
            $scope.carrito.push(producto);
        }

        // Guardar cambios en localStorage para persistencia
        $scope.guardarEnLocalStorage();

        // Feedback visual al usuario con SweetAlert2
        var modalElemento = document.getElementById('modalDetalles');
        var modal = bootstrap.Modal.getInstance(modalElemento);

        // Cerrar el modal de detalles si está abierto
        if (modal) {
            modal.hide();
        }

        // Notificación de éxito al usuario
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: producto.title + ' añadido al carrito',
            showConfirmButton: false,
            timer: 2500
        });
    };

    // Calcula el subtotal de cada producto
    $scope.calcularSubtotal = function(item) {
        if (!item.cantidad || item.cantidad < 1) {
            item.cantidad = 1;
        }

        return (item.price * item.cantidad).toFixed(2);
    };

    // Calcula el total general del carrito
    $scope.calcularTotal = function() {
        var total = 0;

        // Sumar el subtotal de cada producto en el carrito
        $scope.carrito.forEach(function(item) {
            if (!item.cantidad || item.cantidad < 1) {
                item.cantidad = 1;
            }
            // Sumar el precio por la cantidad al total general
            total += item.price * item.cantidad;
        });
        // Devolver el total formateado a dos decimales
        return total.toFixed(2);
    };
    // Nombre usado en la vista: mantener compatibilidad con index.html
    $scope.obtenerTotalNeto = function() {
        return $scope.calcularTotal();
    };

    // Guardar carrito en localStorage (método utilizado en la vista)
    $scope.guardarEnLocalStorage = function() {
        localStorage.setItem('carrito', JSON.stringify($scope.carrito));
        // también guardar con la clave alternativa si es usada por otros scripts
        localStorage.setItem('carrito_tienda', JSON.stringify($scope.carrito));
    };

    // Eliminar producto por índice (mismo nombre que usa la vista)
    $scope.eliminarProducto = function(index) {
        var item = $scope.carrito[index];
        // Confirmación estética con SweetAlert2 antes de eliminar
        Swal.fire({
            title: '¿Eliminar producto?',
            text: `¿Deseas eliminar "${item ? item.title : 'este producto'}" del carrito?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(function(result) {
            if (result.isConfirmed) {
                // Eliminar el producto del carrito y actualizar localStorage
                $scope.$apply(function() {
                    $scope.carrito.splice(index, 1);
                    $scope.guardarEnLocalStorage();
                });
                // Notificación de eliminación exitosa
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Producto eliminado',
                    showConfirmButton: false,
                    timer: 1400
                });
            }
        });
    };

    // Procesar pago (mismo nombre que usa la vista)
    $scope.procesarPago = function() {
        if ($scope.carrito.length === 0) return;
        // Confirmación estética con SweetAlert2
        Swal.fire({
            title: '¡Confirmación de Compra!',
            text: `El monto total a pagar es de $${$scope.obtenerTotalNeto()} USD. ¿Deseas finalizar el pago?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Sí, pagar ahora',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                $scope.$apply(function() {
                    $scope.carrito = [];
                    localStorage.removeItem('carrito');
                    localStorage.removeItem('carrito_tienda');
                });

                // Cerrar el modal de carrito si está abierto
                const modalElement = document.getElementById('modalCarrito');
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();

                // Alerta final de éxito
                Swal.fire('¡Pago Exitoso!', 'Tu orden ha sido procesada correctamente. ¡Gracias por tu compra!', 'success');
            }
        });
    };

    // Contar la cantidad total de productos en el carrito
    $scope.contarProductosCarrito = function() {
    var total = 0;

    // Sumar la cantidad de cada producto en el carrito
    $scope.carrito.forEach(function(item) {
        total += item.cantidad;
    });

    return total;
};
}]);

