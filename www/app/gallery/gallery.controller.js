angular
	.module('app.gallery')
	.controller('GalleryCtrl', GalleryCtrl);

GalleryCtrl.$inject = [
	'$scope', 
	'$localStorage',
	'$sce',
	'$stateParams',
	'galleryservice',
    'img_base_url',
];

function GalleryCtrl($scope, $localStorage, $sce, $stateParams, galleryservice, img_base_url) {
	var vm = this;
	vm.gallery_id = $stateParams.gallery_id;
	vm.img_base_url = img_base_url;

	vm.showAll = function() {
		 galleryservice.index(vm.gallery_id)
			 .then(function(data) {
				 vm.index = data;
				 vm.index.forEach(function(el, idx, arr) {
					 // The server returns a <picture> element containing
					 // the correct URLs to retrieve a copy of the image resized to
					 // roughly fit the current device
					 // @TODO: Locally adjust <picture> to match viewport
					 var pic = el.picture[0];
					 el.picture = $sce.trustAsHtml(pic);
					 arr[idx] = el;
				 });
			 }, function(data) {
				 alert("Failed to load gallery");
			 });
	};
};
