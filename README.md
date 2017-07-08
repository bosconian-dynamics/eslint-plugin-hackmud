# eslint-plugin-hackmud2

Linting rules for hackmud scripts.

## Features

 - Enables and validates code enclosure in single top-level anonymous function
 - Permits subscript syntax `#s.user.script()`
 - Validates subscript syntax
 - Permits `#db` calls
 - Defines hackmud globals `_START`, `_TIMEOUT`
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

### Atom Support
To enable visual indication of eslint messages in the Atom editor, install the [Linter](https://atom.io/packages/linter) and [linter-eslint](https://atom.io/packages/linter-eslint) packages:

```
$ apm install linter
$ apm install linter-eslint
```

If you installed `eslint`/`eslint-plugin-hackmud2` globally, check the "Use global ESLint installation" option in Settings > Packages > linter-eslint > Settings.

## Supported Rules

## TODO
