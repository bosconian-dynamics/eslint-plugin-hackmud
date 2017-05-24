"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var meta = exports.meta = {
  docs: {
    description: "disallow script closure identifier",
    category: "Possible Errors",
    recommended: true
  },
  fixable: "code",
  schema: [] // no options
};

var create = exports.create = function create(context) {
  return {
    "Program > ReturnStatement > FunctionExpression > Identifier.id": function ProgramReturnStatementFunctionExpressionIdentifierId(node) {
      context.report({
        message: "Script closure must not be named",
        node: node,
        data: {
          identifier: node.name
        },
        fix: function fix(fixer) {
          return fixer.remove(node);
        }
      });
    }
  };
};

exports.default = {
  meta,
  create
};