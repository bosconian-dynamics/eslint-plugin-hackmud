'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rules = require('./rules');

var _rules2 = _interopRequireDefault(_rules);

var _configs = require('./configs');

var _configs2 = _interopRequireDefault(_configs);

var _processors = require('./processors');

var _processors2 = _interopRequireDefault(_processors);

var _environment = require('./environment.json');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview Linting rules for hackmud player-scripts
 * @author Adam Bosco
 */
// TODO: take a look at using no-restricted-syntax

exports.default = {
  rules: _rules2.default,
  processors: _processors2.default,
  configs: _configs2.default,
  environments: {
    hackmud2: _environment2.default
  }
};
module.exports = exports['default'];