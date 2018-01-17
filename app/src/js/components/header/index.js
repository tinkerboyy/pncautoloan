import angular from 'angular';

let headerModule = angular.module('app.header', []);

import headerComponent from './header.component';
import headerService from './header.service';

headerModule.component('appHeader', headerComponent);
headerModule.service('HeaderService', headerService);

export default headerModule;