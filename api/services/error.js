var util = require("util");

function EmptyBodyError(message) {
    Error.call(this);
    message = message || 'The provided data body with request is empty.';
    this.message = message;
    this.statusCode = 400;
    // this.stack = (new Error).stack;
    this.name = this.constructor.name;
}

function InvalidCredentialsError(message) {
    Error.call(this);
    message = message || 'The provided credentials are invalid';
    this.message = message;
    this.statusCode = 400;
    // this.stack = (new Error).stack;
    this.name = this.constructor.name;
}

function CannotGenerateTokenError(message) {
    Error.call(this);
    message = message || 'Unfortunately, we cannot generate your access token at the moment.';
    this.message = message;
    this.statusCode = 400;
    // this.stack = (new Error).stack;
    this.name = this.constructor.name;
}

function DeactivatedAccountError(message) {
    Error.call(this);
    message = message || 'Your account is not active.';
    this.message = message;
    this.statusCode = 400;
    // this.stack = (new Error).stack;
    this.name = this.constructor.name;
}

function MissingParameterError(message, fields) {
    Error.call(this);
    message = message || 'The requested parameters are missing from the request';
    this.message = message;
    this.statusCode = 400;
    if (fields instanceof Array) {
      this._fields = fields;
    }
    // this.stack = (new Error).stack;
    this.name = this.constructor.name;
}

function InvalidValueError(field) {
    Error.call(this);
    var message = 'Provided value for ' + (field || '') + ' is invalid';
    this.message = message;
    this.statusCode = 400;
    // this.stack = (new Error).stack;
    this.name = this.constructor.name;
}

function RecordNotFoundError(field) {
    Error.call(this);
    var message = 'The requested record object was not found on the server';
    this.message = message;
    this.statusCode = 400;
    // this.stack = (new Error).stack;
    this.name = this.constructor.name;
}

util.inherits(EmptyBodyError, Error);
util.inherits(InvalidValueError, Error);
util.inherits(InvalidCredentialsError, Error);
util.inherits(DeactivatedAccountError, Error);
util.inherits(CannotGenerateTokenError, Error);
util.inherits(RecordNotFoundError, Error);
util.inherits(MissingParameterError, Error);




module.exports = {
  EmptyBodyError: EmptyBodyError,
  InvalidValueError: InvalidValueError,
  InvalidCredentialsError: InvalidCredentialsError,
  DeactivatedAccountError: DeactivatedAccountError,
  CannotGenerateTokenError: CannotGenerateTokenError,
  RecordNotFoundError: RecordNotFoundError,
  MissingParameterError: MissingParameterError
};
