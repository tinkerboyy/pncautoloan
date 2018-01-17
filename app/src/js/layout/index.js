import angular from 'angular';

let layoutModule = angular.module('app.layout', []);

import ShellController from './shell.controller';

layoutModule.controller('ShellController', ShellController);

export default layoutModule;