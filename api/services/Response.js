(function () {
    'use strict';

    var Response = function Response(isErr, data, token, opts) {
        opts = opts || {};
        var response = {
            status: true,
            meta: {},
            results: {}
        };

        if (opts.monitor) {
          response.meta = opts.monitor;
        }

        if (token) {
          response.token = token;
        }

        // Put the timestamp in meta.
        response.meta.timestamp = (new Date()).toString();

        // if it's an error.
        if (isErr == true) {
            response.status = false;  // no ok.
            response.errors = [];   // Initialize the key

            response.errors=data;
            return response;
        }

        // Data on listing call
        if (data instanceof Array) {
            var total = opts.total || null; // if total is 0, please count the array.
            total = total || data.length; // total or calculate.
            response.total = total;
            response.results = [].concat(data);
            return response;
        }

        if (data instanceof Object) {
            response.results = data;
            return response;
        }

        // Its string, int, double etc.
        response.results = data;

        return response;
    };

    module.exports = Response;
}());
