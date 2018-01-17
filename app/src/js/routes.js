
const routesConfig = ($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) => {
  'ngInject';

  /*
   If you don't want hashbang routing, uncomment this line.
   Our tutorial will be using hashbang routing though :)
   */
  // $locationProvider.html5Mode(true);

  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'layout/shell.html'
    })
    .state('app.home', {
      url: '/',
      controller: 'MarketingCtrl',
      controllerAs: 'home',
      templateUrl: 'pages/marketing/marketing.html',
      title: 'Home'
    });

  $urlRouterProvider.otherwise('/');
}

export default routesConfig;