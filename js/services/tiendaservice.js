// Servicio que se conecta al internet para traer los productos
// Este servicio se encarga de realizar las llamadas HTTP a la API de Fake Store para obtener los productos y las categorías disponibles
app.factory('tiendaService', ['$http', function($http) {
    var urlBase = 'https://fakestoreapi.com';

    return {
        // Función para traer todos los productos
        obtenerProductos: function() {
            return $http.get(urlBase + '/products')
                .then(function(response) {
                    return response.data;
                });
        },
        // Función para traer las categorías
        obtenerCategorias: function() {
            
            return $http.get(urlBase + '/products/categories')
                .then(function(response) {
                    
                    return response.data;
                });
        }
    };
}]);