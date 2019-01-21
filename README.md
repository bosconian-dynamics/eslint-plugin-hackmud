# eslint-plugin-hackmud2

[![npm](https://img.shields.io/npm/v/eslint-plugin-hackmud2.svg?style=plastic)](https://www.npmjs.com/package/eslint-plugin-hackmud2) [![license](https://img.shields.io/github/license/KuroTsuto/eslint-plugin-hackmud.svg?style=plastic)](https://github.com/KuroTsuto/eslint-plugin-hackmud/blob/master/LICENSE.md) [![npm](https://img.shields.io/npm/dt/eslint-plugin-hackmud2.svg?style=plastic)](https://www.npmjs.com/package/eslint-plugin-hackmud2) 

Linting rules for hackmud scripts.

## Features

 - Permits and validates code enclosure in single top-level anonymous function
 - Permits subscript syntax `#fs.user.script()`, `#f4.user.script()`
 - Limited validation of subscript syntax
 - Permits `#db` calls
 - Defines hackmud globals `_START`, `_TIMEOUT`, `_ST`, `_TO`, `_END`
 - Permits `#D`, `#G`, and `#FMCL` preprocessor directives

This plugin is somewhat hackish, at the moment - the largest caveat is that linted scripts should not contain `$S_`, `$DB_`, `$G`, `$D`, or `$FMCL`.

## Installation

Install the [ESLint](http://eslint.org) linter and `eslint-plugin-hackmud2`, either locally (in the directory containing your scripts, or an ancestor of it) or globally - if you don't know the difference I recommend the latter:

```
$ npm install --global eslint eslint-plugin-hackmud2
```

## Usage

To activate `eslint-plugin-hackmud2`, create a `.eslintrc.json` configuration file in the root work directories containing the script sources which you'd like to lint (or configure your linter/editor's linter plugin to use the configuration file in the location of your choice).

Add `hackmud2` to the plugins section of your `.eslintrc.json` configuration file, and `"plugin:hackmud2/recommended"` as the base configuration:

```json
{
  "plugins": [
    "hackmud2"
  ],
  "extends": "plugin:hackmud2/recommended"
}
```

If your scripts reside in the standard `hackmud/{user}/scripts` directories, most ESLint consumers should pick up on a single configuration file in the common `hackmud` directory.

### Command line usage
```
$ eslint myscript.js
```

### IDE Support
Many popular editors and IDEs support ESLint integration to provide visual indicators for validation rules. Try searching for how to enable ESLint support for your editor if it is not listed below.

#### Atom
Install the [Linter](https://atom.io/packages/linter) and [linter-eslint](https://atom.io/packages/linter-eslint) packages:

```
$ apm install linter
$ apm install linter-eslint
```

If you installed `eslint`/`eslint-plugin-hackmud2` globally, check the "Use global ESLint installation" option in Settings > Packages > linter-eslint > Settings.

#### Visual Studio Code
Enable ESLint linting in your Workspace's settings - I also recommend disabling VSCode's TypeScript validation engine to suppress extraneous warnings. If it doesn't exist already, create a `.vscode` directory in your workspace root containing a `settings.json` file. Add the following lines:

```json
{
    "javascript.validate.enable": false,
    "eslint.enable": true
}
```

## Supported Rules

## TODO
