import angular from 'angular';

let bannerModule = angular.module('app.banner', []);

import bannerComponent from './banner.component';

bannerModule.component('appBanner', bannerComponent);

export default bannerModule;