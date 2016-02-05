angular
	.module('app.gallery')
	.factory('galleryservice', galleryservice);

function galleryservice($http, $q, drupal_instance, api_endpoint) {

	return {
		index: function(gallery) {

			var defer = $q.defer();

			$http({
				method: 'GET',
				url: drupal_instance + api_endpoint + 'gallery-all',
				dataType: 'json',
				crossDomain: true
			})
			.success(function(data, status, headers, config) {
				defer.resolve(data);
			})
			.error(function(data, status, headers, config) {
				defer.reject(data);
			});

			return defer.promise;
		}
	}
}
