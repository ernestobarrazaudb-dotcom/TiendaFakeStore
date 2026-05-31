// Controlador para la tienda
app.controller('TiendaController', ['$scope', 'tiendaService', function ($scope, tiendaService) {
    $scope.productos = [];
    $scope.categorias = [];
    $scope.carrito = [];
    $scope.searchText = '';
    $scope.selectedCategory = '';

    // Función para filtrar productos por categoría
    tiendaService.obtenerProductos().then(function (data) {
        $scope.productos = data;
    }).catch(function (error) {
        console.error("Error al cargar productos:", error);
    });

    // Función para cargar categorías
    tiendaService.obtenerCategorias().then(function (data) {
        $scope.categorias = data;
    }).catch(function (error) {
        console.error("Error al cargar categorías:", error);
    });

    // Producto seleccionado para mostrar en el modal de detalles
    $scope.productoSeleccionado = null;

    // Abre el modal y carga la información del producto seleccionado
    $scope.verDetalles = function (producto) {
        $scope.productoSeleccionado = producto;

        var modal = new bootstrap.Modal(document.getElementById('modalDetalles'));
        modal.show();
    };

    // Agrega productos al carrito y controla si ya existen
    $scope.agregarAlCarrito = function (producto) {
        var productoExistente = $scope.carrito.find(function (item) {
            return item.id === producto.id;
        });

        // Si el producto ya existe en el carrito, incrementa la cantidad
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            producto.cantidad = 1;
            $scope.carrito.push(producto);
        }

        // Cierra el modal después de agregar al carrito
        var modalElemento = document.getElementById('modalDetalles');
        var modal = bootstrap.Modal.getInstance(modalElemento);

        // Si el modal está abierto, se cierra
        if (modal) {
            modal.hide();
        }
    };

    // Calcula el subtotal de cada producto
    $scope.calcularSubtotal = function (item) {
        if (!item.cantidad || item.cantidad < 1) {
            item.cantidad = 1;
        }

        // Retorna el subtotal formateado a dos decimales
        return (item.price * item.cantidad).toFixed(2);
    };

    // Calcula el total general del carrito
    $scope.calcularTotal = function () {
        var total = 0;

        // Recorre cada producto en el carrito para calcular el total
        $scope.carrito.forEach(function (item) {
            if (!item.cantidad || item.cantidad < 1) {
                item.cantidad = 1;
            }

            total += item.price * item.cantidad;
        });

        return total.toFixed(2);
    };

    // Función para contar el total de productos en el carrito
    $scope.contarProductosCarrito = function () {
        var total = 0;

        $scope.carrito.forEach(function (item) {
            total += item.cantidad;
        });

        return total;
    };
}]);