app.controller('TiendaController', ['$scope', 'tiendaService', function($scope, tiendaService) {
    $scope.productos = [];
    $scope.categorias = [];
    
    $scope.searchText = '';
    $scope.selectedCategory = '';

    
    tiendaService.obtenerProductos().then(function(data) {
        $scope.productos = data;
    }).catch(function(error) {
        console.error("Error al cargar productos:", error);
    });

    tiendaService.obtenerCategorias().then(function(data) {
        $scope.categorias = data;
    }).catch(function(error) {
        console.error("Error al cargar categorías:", error);
    });
}]);