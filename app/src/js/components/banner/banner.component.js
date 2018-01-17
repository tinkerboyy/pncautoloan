import BannerCtrl from './banner.controller';

let bannerComponent = {
  bindings: {title: '@'},
  controller: BannerCtrl,
  controllerAs: 'bannerCtrl',
  templateUrl: 'components/banner/banner.html'
};

export default bannerComponent;