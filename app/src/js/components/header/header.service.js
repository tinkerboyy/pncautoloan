class HeaderService {
  constructor($http, $q) {
    'ngInject';

    this._$q = $q;

    this.menuItems = [
      {
        title: 'Login',
        href: '#/login',
        colorHex: '2d3943'
      }
    ];
  }

  loadMenu() {
    return this._$q.when(this.menuItems);
  }
}

export default HeaderService;