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

	var gallery = $stateParams;
	vm.showAll = function() {
		 galleryservice.index(vm.gallery_id)
			 .then(function(data) {
				 vm.index = data;
				 vm.index.forEach(function(el, idx, arr) {
					 var pic = el.picture[0];
					 el.picture = $sce.trustAsHtml(pic);
					 arr[idx] = el;
				 });
				 console.log(vm.index[0]);
				 console.log("Loaded gallery index");
			 }, function(data) {
				 console.log("Failed to retrieve gallery index");
			 });
	};
};
