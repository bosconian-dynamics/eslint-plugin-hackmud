"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var meta = exports.meta = {
  docs: {
    description: "disallow code outside of the script closure",
    category: "Possible Errors",
    recommended: true
  },
  schema: [] // no options
};

var create = exports.create = function create(context) {
  return {
    "Program > ReturnStatement ~ *": function ProgramReturnStatement(node) {
      context.report({
        message: "All code must be contained in the script closure",
        node: node
      });
    }
  };
};

exports.default = {
  meta,
  create
};