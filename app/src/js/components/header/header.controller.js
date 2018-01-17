class AppHeaderCtrl {
  constructor($mdSidenav, $mdBottomSheet, $mdInkRipple, HeaderService, $q) {
    'ngInject';

    this.appName = 'Header';
    this.menuItems = [];
    this._$q = $q;
    this.$mdSidenav = $mdSidenav;
    this.$mdInkRipple = $mdInkRipple;

    this.menuService = HeaderService;
  }

  $onInit() {
    this.menuService
      .loadMenu()
      .then((items) => {
        this.menuItems = [...items];
        console.log(this.menuItems);


        this.$mdInkRipple.attach(self, angular.element(document.getElementById('header-toolbar')), {
          center: false,
          dimBackground: false
        });
      });
  }

  toggleView() {
    let pending = $mdBottomSheet.hide() || this._$q.when(true);

    pending.then(function(){
      this.$mdSidenav('left').toggle();
    });
  }
}

export default AppHeaderCtrl