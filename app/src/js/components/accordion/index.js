import angular from 'angular';

let accordionModule = angular.module('app.accordion', []);

import AccordionComponent from './accordion.component';
import AccordionGroupComponent from './accordion-group.component';

accordionModule.component('appAccordion', AccordionComponent);
accordionModule.component('appAccordionGroup', AccordionGroupComponent);

export default accordionModule;
