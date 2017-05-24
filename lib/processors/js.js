'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config.js');

function pre(text, filename) {
  // TODO: handle multiple top-level anonymous closures
  text = text.replace(/#s\./g, _config.SUBSCRIPT_PREFIX);
  return [`return ${text}`];
}

function post(messages, filename) {
  messages = messages[0].map(function (message) {
    if (message.line == 1) message.column -= 7;

    if (message.source.includes(_config.SUBSCRIPT_PREFIX)) message.source = message.source.replace(_config.SUBSCRIPT_PREFIX, '#s.');

    if (message.message.includes(_config.SUBSCRIPT_PREFIX)) message.message = message.message.replace(_config.SUBSCRIPT_PREFIX, '#s.');

    return message;
  }).filter(function (msg, i, msgs) {
    if (msg.ruleId == 'no-unreachable' && msgs.some(function (m) {
      return m.ruleId == 'hackmud2/no-closure-siblings' && m.line == msg.line;
    })) return false;

    if (msg.ruleId == 'no-undef' && msgs.some(function (m) {
      return m.ruleId == 'hackmud2/validate-subscript-syntax' && m.line == msg.line;
    })) return false;

    return true;
  }).sort(function (a, b) {
    return a.severity == b.severity ? 0 : a.severity > b.severity ? -1 : 1;
  });

  return messages;
}

exports.default = {
  preprocess: pre,
  postprocess: post
};
module.exports = exports['default'];