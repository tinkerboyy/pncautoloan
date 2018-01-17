import angular from 'angular';

import './banner';
import './header';
import './footer';
import './card';
import './zipcode';
import './accordion';


let commonModule = angular.module('app.common', [
    'app.zipcode',
    'app.banner',
    'app.header',
    'app.footer',
    'app.card',
    'app.accordion'
  ]);

export default commonModule;