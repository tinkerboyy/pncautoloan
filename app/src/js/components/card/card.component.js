import CardController from './card.controller';

let panelComponent = {
  bindings: {
    panelHeader: '<',
    templateUrl: '<'
  },
  controller: CardController,
  controllerAs: 'cardCtrl',
  templateUrl: 'components/card/card.html'
};

export default panelComponent;