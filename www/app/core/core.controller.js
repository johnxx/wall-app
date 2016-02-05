angular
	.module('app.core')
	.controller('MenuCtrl', MenuCtrl);

MenuCtrl.$inject = [
	'$scope', 
	'$localStorage'
];

function MenuCtrl($scope, $localStorage ) {
	var vm = this;
	vm.showAll = function() {
		alert("Showing all");
	}
};
