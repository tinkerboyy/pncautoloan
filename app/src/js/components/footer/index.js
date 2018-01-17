import angular from 'angular';

let footerModule = angular.module('app.footer', []);

import footerComponent from './footer.component';

footerModule.component('appFooter', footerComponent);

export default footerModule;