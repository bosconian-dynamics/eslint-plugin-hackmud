"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  "env": {
    "hackmud/hackmud": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "no-unused-vars": "off",
    "no-extend-native": "error",
    "no-unreachable": "warn",
    "no-constant-condition": "warn",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-fallthrough": "off",
    "no-global-assign": "error",
    "no-implied-eval": "error",
    "hackmud/validate-subscript-syntax": "error",
    "hackmud/no-closure-identifier": "error",
    "hackmud/no-closure-siblings": "error"
  }
};