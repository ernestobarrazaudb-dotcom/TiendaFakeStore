var app = angular.module('TiendaFakeStoreApp', []);
// Este archivo inicializa el módulo principal de la tienda
angular.module('tiendaApp', [])
    .controller('CarritoController', ['$scope', function ($scope) {

        // 1. Inicializar el carrito buscando si ya hay datos guardados en LocalStorage
        $scope.carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // 2. Función para guardar el estado actual del carrito en LocalStorage
        $scope.guardarEnLocalStorage = function () {
            localStorage.setItem('carrito', JSON.stringify($scope.carrito));
        };

        // 3. Función para calcular el Monto Total Neto (.toFixed(2) aplicado estrictamente)
        $scope.obtenerTotalNeto = function () {
            let total = 0;
            angular.forEach($scope.carrito, function (item) {
                total += item.price * item.cantidad;
            });
            return total.toFixed(2);
        };

        // 4. Función para eliminar un elemento del carrito
        $scope.eliminarProducto = function (index) {
            $scope.carrito.splice(index, 1); // Remueve el producto del array
            $scope.guardarEnLocalStorage();   // Actualiza el LocalStorage inmediatamente
        };

        // 5. Función de Checkout (Procesar Pago con SweetAlert)
        $scope.procesarPago = function () {
            if ($scope.carrito.length === 0) return;

            // Disparar la confirmación estética con SweetAlert2
            Swal.fire({
                title: '¡Confirmación de Compra!',
                text: `El monto total a pagar es de $${$scope.obtenerTotalNeto()} USD. ¿Deseas finalizar el pago?`,
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#198754',
                cancelButtonColor: '#dc3545',
                confirmButtonText: 'Sí, pagar ahora',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Si el usuario acepta, se limpia la memoria del carrito
                    $scope.$apply(function () {
                        $scope.carrito = []; // Vacía el array en AngularJS
                        localStorage.removeItem('carrito'); // Borra la clave en LocalStorage
                    });

                    // Cierra el modal de Bootstrap programáticamente (opcional, pero recomendado)
                    const modalElement = document.getElementById('modalCarrito');
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    if (modal) modal.hide();

                    // Alerta final de éxito
                    Swal.fire(
                        '¡Pago Exitoso!',
                        'Tu orden ha sido procesada correctamente. ¡Gracias por tu compra!',
                        'success'
                    );
                }
            });
        };
    }]);