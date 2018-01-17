import angular from 'angular';

let cardModule = angular.module('app.card', []);

import cardComponent from './card.component';

cardModule.component('appCard', cardComponent);

export default cardModule;