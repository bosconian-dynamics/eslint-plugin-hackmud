'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config.js');

function pre(text, filename) {
  // TODO: handle multiple top-level anonymous closures
  text = text.replace(/#(\w)?s\./g, '$$1S_').replace(/#db\./g, _config.DATABASE_PREFIX).replace(/#D/g, _config.PREPROC_D).replace(/#G/g, _config.PREPROC_G).replace(/#FMCL/g, _config.PREPROC_FMCL);

  return [`return ${text}`];
}

function post(messages, filename) {
  messages = messages[0].map(function (message) {
    if (message.line == 1) message.column -= 7;

    message.source = message.source.replace(/$(\w?S_)/g, '#s.').replace(_config.DATABASE_PREFIX, '#db.').replace(_config.PREPROC_D, '#D').replace(_config.PREPROC_G, '#G').replace(_config.PREPROC_FMCL, '#FMCL');

    message.message = message.message.replace(/$(\w?S_)/g, '#s.').replace(_config.DATABASE_PREFIX, '#db.').replace(_config.PREPROC_D, '#D').replace(_config.PREPROC_G, '#G').replace(_config.PREPROC_FMCL, '#FMCL');

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