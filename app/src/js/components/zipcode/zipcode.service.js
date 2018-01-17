class ZipcodeService {
  constructor($http, $q) {
    'ngInject';

    this._$http = $http;
    this._$q = $q;
  }

  getRates(zipcode) {
    let url = `/api/rates`;
    let deferred = this._$q.defer();
    this._$http.get(`${url}`)
      .success((response) => {
        deferred.resolve(response);
      })
      .catch((error) => {
        deferred.reject(error);
      });
    return deferred.promise;
  }

  getSome() {
    let deferred = this._$q.defer();
    this._$http.get('/api/rates')
      .success((res) => {
        deferred.resolve(res);
      })
      .catch((error) => {
        deferred.reject(error);
      });

    return deferred.promise;
  }
}

export default ZipcodeService;