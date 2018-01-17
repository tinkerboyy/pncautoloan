import angular from 'angular';
import 'angular-ui-router';
import 'angular-material';
import 'angular-aria';

import appConfig  from './config/app.config';
import RoutesConfig from './routes';
import './config/app.templates';
import './components';
import './layout';
import './pages/marketing';

function materialConfig($mdThemingProvider) {
  'ngInject';

  $mdThemingProvider
    .theme('default')
    .primaryPalette('teal')
    .accentPalette('red');
}

const requires = [
  'ui.router',
  'ngMaterial',
  'ngAria',
  'templates',
  'app.layout',
  'app.common',
  'app.marketing'
];

window.app = angular.module('app', requires);

//angular.module('app').constant('AppConstants', constants);

angular.module('app').config(RoutesConfig);
angular.module('app').config(materialConfig);

//angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
