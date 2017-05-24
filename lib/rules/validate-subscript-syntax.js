"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.validateSubscriptIdentifier = exports.getPropertyPath = exports.meta = undefined;

var _config = require("../config.js");

var meta = exports.meta = {
  docs: {
    description: "disallow script closure identifier",
    category: "Possible Errors",
    recommended: true
  },
  schema: [] // no options
};

var getPropertyPath = exports.getPropertyPath = function getPropertyPath(node) {
  if (node.type == 'Identifier') return [node.name];

  if (node.type == 'MemberExpression') return getPropertyPath(node.object).concat(getPropertyPath(node.property));

  if (node.type == 'CallExpression') return getPropertyPath(node.callee);

  throw new Error('Cannot handle AST node type ' + node.type);
};

var validateSubscriptIdentifier = exports.validateSubscriptIdentifier = function validateSubscriptIdentifier(context, node, identifier) {
  if (!identifier.length) {
    return context.report({
      message: 'Missing subscript identifier',
      node: node,
      loc: {
        start: {
          line: node.loc.start.line,
          column: node.loc.start.column + 3
        },
        end: node.loc.end
      }
    });
  }

  var user = /^([a-z][a-zA-Z0-9_]*)[$\W.]/.exec(identifier);
  if (!user) {
    context.report({
      message: 'Invalid username for subscript #s.' + identifier,
      node: node,
      loc: {
        start: {
          line: node.loc.start.line,
          column: node.loc.start.column + 3
        },
        end: node.loc.end
      }
    });
  } else {
    user = user[1];
  }

  var script = identifier.substr(identifier.indexOf('.') + 1);
  if (!identifier.includes('.') || !script.length) {
    return context.report({
      message: 'Missing script name for subscript #s.' + identifier,
      node: node,
      loc: {
        start: {
          line: node.loc.start.line,
          column: node.loc.start.column + 3 + (user ? user.length : identifier.length)
        },
        end: node.loc.end
      }
    });
  }

  if (script.includes('.')) {
    return context.report({
      message: 'Invalid syntax for scriptor #s.' + identifier,
      node: node,
      loc: {
        start: {
          line: node.loc.start.line,
          column: node.loc.start.column + 3
        },
        end: node.loc.end
      }
    });
  }

  script = /^[a-z][a-zA-Z0-9_]*$/.exec(script);
  if (!script) {
    return context.report({
      message: 'Invalid script name for subscript #s.' + identifier,
      node: node,
      loc: {
        start: {
          line: node.loc.start.line,
          column: node.loc.start.column + 4 + user.length
        },
        end: node.loc.end
      }
    });
  } else {
    script = script[0];
  }

  return { user: user, script: script };
};

var create = exports.create = function create(context) {
  return {
    "ReturnStatement > FunctionExpression CallExpression": function ReturnStatementFunctionExpressionCallExpression(node) {
      var callee = node.callee.object;
      if (callee.name.indexOf('$S_') != 0) return;

      var identifier = getPropertyPath(node).join('.').substr(3);
      var subscript = validateSubscriptIdentifier(context, callee, identifier);

      if (!subscript) return;

      var callLeftParen = context.getTokenAfter(node.callee);

      if (callLeftParen.value != '(') {
        return context.report({
          message: 'Unexpected {{ type }} {{ token }} Expected: (',
          node: callee,
          loc: {
            start: {
              line: callee.loc.start.line,
              column: callee.loc.start.column + 3 + identifier.length
            },
            end: callee.loc.end
          },
          data: {
            type: callLeftParen.type,
            token: callLeftParen.value
          }
        });
      }

      if (callLeftParen.start - node.callee.end) {
        return context.report({
          message: 'Unexpected whitespace between subscript identifier and calling paranthesis',
          node: callee,
          loc: {
            start: {
              line: callee.loc.start.line,
              column: callLeftParen.start
            },
            end: callee.loc.end
          }
        });
      }
    }
  };
};

exports.default = {
  meta,
  create
};