# eslint-plugin-hackmud2

Linting rules for hackmud scripts.

## Features

Currently adds various rules for permitting and validating subscript syntax as well as the anonymous top-level script closure. They're somewhat hackish, at the moment - the largest caveats are that your script cannot contain `$S_`, and `#db` and non-trust subscript support is not quite together yet.

## Installation

Install the [ESLint](http://eslint.org) linter and the `eslint-plugin-hackmud2`, either locally or globally - if you don't know the difference I recommend the latter:

```
$ npm install --global eslint eslint-plugin-hackmud
```

## Usage

To activate `eslint-plugin-hackmud2`, create a `.eslintrc.json` configuration file in the directories containing the script sources which you'd like to lint. Alternately, if all of your scripts are in the standard `hackmud/{username}/scripts` location, you can place a single configuration file in `hackmud`, which will apply the configuration for all subdirectories.

Add `hackmud2` to the plugins section of your `.eslintrc.json` configuration file, and `"plugin:hackmud2/recommended"` as the base configuration:

```json
{
  "plugins": [
    "hackmud2"
  ],
  "extends": "plugin:hackmud2/recommended"
}
```

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

## Supported Rules

## TODO
