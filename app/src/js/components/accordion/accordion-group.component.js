import AccordionComponent from './accordion.component';
import AccordionController from './accordion.controller';

let accordionGroupComponent = {
  bindings: {
    addGroup: '@'
  },
  require: {
    parent: '^appAccordion'
  },
  transclude: true,
  template: `<div ng-transclude></div>`,
  controllerAs: 'groupCtrl',
  controller: class AccordionGroup {
    $onInit() {
      console.log(this.parent);
      this.parent.foo(); // 'Foo from parent!'
    }
  }
}

export default accordionGroupComponent;
