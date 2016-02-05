angular
	.module('app.gallery')
	.controller('GalleryCtrl', GalleryCtrl);

GalleryCtrl.$inject = [
	'$scope', 
	'$localStorage',
	'$sce',
	'galleryservice',
    'img_base_url',
];

function GalleryCtrl($scope, $localStorage, $sce, galleryservice, img_base_url) {
	var vm = this;
	vm.dummy = function() {
		alert("dummy");
	}
	vm.img_base_url = img_base_url;
	vm.showAll = function() {
		 galleryservice.index($scope.gallery)
			 .then(function(data) {
				 vm.index = data;
				 vm.index.forEach(function(el, idx, arr) {
					 var pic = el.picture[0];
					 el.picture = $sce.trustAsHtml(pic);
					 arr[idx] = el;
				 });
				 console.log(vm.index[0].picture);
				 console.log("Loaded gallery index");
			 }, function(data) {
				 console.log("Failed to retrieve gallery index");
			 });
	};
};
