'use strict';

di('AbstractRemoteResourceScope', function(di) {
  var
    AbstractScope = di('AbstractScope'),
    inherit = di('inherit')
  ;

  function AbstractRemoteResourceScope(id, urlConfig) {
    var
      parseUrlResolver = di('parseUrlResolver');

    AbstractScope.call(this, id);

    this.urlResolver = parseUrlResolver(urlConfig);
    this._cache = null;
    this._resource = null;
  }

  return inherit(AbstractRemoteResourceScope, AbstractScope, {

    preLoad: function() {
      return this._getResource();
    },

    _getResource: function() {
      var
        promise,
        self = this;

      if (this._cache) {
        return this._cache;
      }
      promise = this._cache = this._loadResource();
      promise.then(null,
        function(resource) {
          self._resource = resource;
        },
        function() {
          self._cache = null;
        }
      );

      return promise;
    },

    _loadResource: function() {
      var
        Promise = di('Promise');
      return Promise.reject();
    }

  });

});