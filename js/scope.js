// Definimos el módulo y el controlador
$scope.agregarAlCarrito = function (producto) {
    // Buscar si el producto ya existe en el carrito
    let encontrado = $scope.carrito.find(item => item.id === producto.id);

    if (encontrado) {
        encontrado.cantidad += 1; // Si ya está, solo sumamos la cantidad
    } else {
        // Si es nuevo, lo clonamos y le seteamos la propiedad cantidad en 1
        let nuevoItem = angular.copy(producto);
        nuevoItem.cantidad = 1;
        $scope.carrito.push(nuevoItem);
    }

    // Guardamos en LocalStorage para persistencia
    guardarLocalStorage();

    // Feedback visual al usuario con SweetAlert
    Swal.fire({
        icon: 'success',
        title: '¡Agregado!',
        text: `${producto.title} se añadió al carrito.`,
        showConfirmButton: false,
        timer: 2500
    });
};