import AccordionController from './accordion.controller';

let accordionComponent = {
  bindings: {},
  controller: AccordionController,
  transclude: true,
  template: `<div ng-transclude></div>`
}

export default accordionComponent;
