var app = angular.module('app');


/* 
 * Ionic app and cordova run configuration
 */ 
app.run(function($ionicPlatform, $rootScope, $ionicLoading) {

  // Add a spinner whenever we're processing an HTTP request
  $rootScope.$on('loading:show', function() {
	  $ionicLoading.show({template: "<ion-spinner></ion-spinner>"})
  });
  $rootScope.$on('loading:hide', function() {
	  $ionicLoading.hide();
  });

  $ionicPlatform.ready(function() {
    
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


/* 
 * Ionic app configuration
 */ 
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;

  //Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  // Add an interceptor to HTTP requests so we can show a loading animation
  $httpProvider.interceptors.push(function($rootScope) {
	  return {
		  request: function(config) {
			  $rootScope.$broadcast('loading:show');
			  return config;
		  },
	  	  response: function(response) {
			  $rootScope.$broadcast('loading:hide');
			  return response;
		  }
	  }
  });

  // Routes
  // @TODO: Move these into their own file
  $stateProvider.state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'MenuCtrl',
	controllerAs: 'vm'
  })
  .state('app.gallery', {
	  url: "/gallery/:gallery_id",
	  templateUrl: "templates/gallery.html",
	  controller: "GalleryCtrl",
	  controllerAs: 'vm'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/gallery/all');
});
