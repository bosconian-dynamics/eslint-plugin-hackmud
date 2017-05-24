"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.validateIdentifier = exports.getSubscript = exports.meta = undefined;

var _config = require("../config.js");

var meta = exports.meta = {
  docs: {
    description: "disallow script closure identifier",
    category: "Possible Errors",
    recommended: true
  },
  schema: [] // no options
};

var getSubscript = exports.getSubscript = function getSubscript(node) {
  var identifier = [node.name.substr(3)];
  var root = node;

  while (root.parent.type == 'MemberExpression') {
    identifier.push(root.parent.property.name);
    root = root.parent;
  }

  return {
    identifier,
    root: root.parent,
    node
  };
};

var validateIdentifier = exports.validateIdentifier = function validateIdentifier(context, subscript) {
  var identifier = subscript.identifier,
      root = subscript.root,
      node = subscript.node;


  if (!identifier.length || !identifier[0]) {
    return context.report({
      message: 'Missing subscript identifier',
      node: node
    });
  }

  if (identifier.length > 2) {
    context.report({
      message: `Invalid subscript identifier`,
      node: root
    });
  }

  var user = subscript.user = identifier[0];
  var script = subscript.script = identifier[1];
  identifier = subscript.identifier = identifier.join('.');

  if (!/^[a-z][a-z0-9_]*$/.test(user)) {
    context.report({
      message: 'Invalid username for subscript #s.' + identifier,
      node: root
    });
  }

  if (!script) {
    return context.report({
      message: 'Missing script name for subscript #s.' + identifier,
      node: root
    });
  }

  if (!/^[a-z][a-z0-9_]*$/.test(user)) {
    context.report({
      message: 'Invalid script name for subscript #s.' + identifier,
      node: root
    });
  }

  return subscript;
};

var create = exports.create = function create(context) {
  var globalScope = void 0;

  /**
   * makeDefined() - Force define identifiers on the fly.
   * Borrowed from https://github.com/gajus/eslint-plugin-flowtype/blob/1edcaec087695482c0a860bead6bfa4f19c15ea3/src/rules/defineFlowType.js
   *
   * Copyright (c) 2015, Gajus Kuizinas (http://gajus.com/)
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *  * Redistributions of source code must retain the above copyright
   *    notice, this list of conditions and the following disclaimer.
   *  * Redistributions in binary form must reproduce the above copyright
   *    notice, this list of conditions and the following disclaimer in the
   *    documentation and/or other materials provided with the distribution.
   *  * Neither the name of the Gajus Kuizinas (http://gajus.com/) nor the
   *    names of its contributors may be used to endorse or promote products
   *    derived from this software without specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   * DISCLAIMED. IN NO EVENT SHALL ANUARY BE LIABLE FOR ANY
   * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
   * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
   * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
   * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */
  var makeDefined = function makeDefined(ident) {
    var ii = void 0;

    // start from the right since we're going to remove items from the array
    for (ii = globalScope.through.length - 1; ii >= 0; ii--) {
      var ref = globalScope.through[ii];

      if (ref.identifier.name === ident.name) {
        // use "__defineGeneric" since we don't have a reference to "escope.Variable"
        globalScope.__defineGeneric( // eslint-disable-line no-underscore-dangle
        ident.name, globalScope.set, globalScope.variables);
        var variable = globalScope.set.get(ident.name);

        variable.writeable = false;
        // "through" contains all references whose definition cannot be found
        // so we need to update references and remove the ones that were added
        globalScope.through.splice(ii, 1);
        ref.resolved = variable;
        variable.references.push(ref);
      }
    }
  };

  return {
    "Program": function Program() {
      return globalScope = context.getScope();
    },
    "ReturnStatement > FunctionExpression Identifier[name=/^\\$S_/]": function ReturnStatementFunctionExpressionIdentifierName$S_(node) {
      var subscript = validateIdentifier(context, getSubscript(node));
      if (!subscript) return;

      var root = subscript.root,
          identifier = subscript.identifier,
          user = subscript.user;

      if (root.type != 'CallExpression') {
        return context.report({
          message: 'Missing calling parenthesis',
          node: node
        });
      }

      var nextToken = context.getTokenAfter(root.callee);
      if (nextToken.value != '(') {
        return context.report({
          message: 'Unexpected {{ type }} {{ token }} Expected: (',
          node: root,
          data: {
            type: nextToken.type,
            token: nextToken.value
          }
        });
      }

      var source = context.getSourceCode();
      if (source.isSpaceBetweenTokens(root.callee, nextToken)) {
        return context.report({
          message: 'Unexpected whitespace between subscript identifier and call',
          node: root
        });
      }

      // If the scriptor's valid, mark it as "defined" to avoid no-undef hints
      makeDefined(node);
    }
  };
};

exports.default = {
  meta,
  create
};