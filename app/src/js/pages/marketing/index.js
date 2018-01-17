import angular from 'angular';
//import MarketingConfig from './marketing.config';
import marketingCtrl from './marketing.controller';

let marketingModule = angular.module('app.marketing', []);

//marketingModule.config(MarketingConfig);
marketingModule.controller('MarketingCtrl', marketingCtrl);

export default marketingModule;