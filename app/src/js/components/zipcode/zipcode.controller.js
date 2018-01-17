class ZipcodeController {
  constructor(zipcodeService) {
    'ngInject';
    this._service = zipcodeService;
    this.mockData = {
      zipcode: '12345'
    };
    this.ratesObject = {};
   console.log(zipcodeService.getSome());

  }

  $onInit() {
    this._service.getSome().then((data) => {
      console.log(data);
      this.ratesObject = data;
    });
  }

  changeZipcode(zipcode) {
    if (zipcode && zipcode.length > 4) {
      console.log(zipcode);
      this._service.getRates(zipcode)
        .then((response) => {
          this.ratesObject = response;
          console.log(response);
        });
    }
  }

}

export default ZipcodeController;