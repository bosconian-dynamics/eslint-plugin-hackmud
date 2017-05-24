'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _noClosureIdentifier = require('./no-closure-identifier');

var _noClosureIdentifier2 = _interopRequireDefault(_noClosureIdentifier);

var _noClosureSiblings = require('./no-closure-siblings');

var _noClosureSiblings2 = _interopRequireDefault(_noClosureSiblings);

var _validateSubscriptSyntax = require('./validate-subscript-syntax');

var _validateSubscriptSyntax2 = _interopRequireDefault(_validateSubscriptSyntax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  'no-closure-identifier': _noClosureIdentifier2.default,
  'no-closure-siblings': _noClosureSiblings2.default,
  'validate-subscript-syntax': _validateSubscriptSyntax2.default
};
module.exports = exports['default'];