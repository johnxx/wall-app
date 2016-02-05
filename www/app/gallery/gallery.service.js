angular
	.module('app.gallery')
	.factory('galleryservice', galleryservice);

// @TODO: Use ngResource instead here
function galleryservice($http, $q, drupal_instance, api_endpoint) {

	return {
		index: function(gallery) {

			var defer = $q.defer();
			base_url = drupal_instance + api_endpoint + 'gallery-all';

			// For now we reference galleries by ID
			gallery = parseInt(gallery);

			if(!isNaN(gallery)) {
				// @TODO: Find a better place to keep this constant
				url = base_url + '?field_reddit_subreddit_tag_tid%5B%5D=' + gallery;
			} else {
				url = base_url;
			}

			$http({
				method: 'GET',
				url: url,
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
