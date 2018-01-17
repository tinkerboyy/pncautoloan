import angular from 'angular';

let zipcodeModule = angular.module('app.zipcode', []);

import zipcodeService from './zipcode.service.js';
import zipcodeComponent from './zipcode.component.js';

zipcodeModule.service('zipcodeService', zipcodeService);
zipcodeModule.component('appZipcode', zipcodeComponent);

export default zipcodeModule;