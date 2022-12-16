# eslint-plugin-feature-sliced-design

Plugin for feature-sliced designed projects

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-feature-sliced-design`:

```sh
npm install eslint-plugin-feature-sliced-design --save-dev
```

## Usage

Add `feature-sliced-design` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "feature-sliced-design"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "feature-sliced-design/rule-name": 2
    }
}
```

## Supported Rules

* [relative-path-within-slice](https://github.com/nadProg/eslint-plugin-feature-sliced-design/blob/main/docs/rules/relative-path-within-slice.md): Check whether import path within a slice is relative.
* [public-api-slice-import](https://github.com/nadProg/eslint-plugin-feature-sliced-design/blob/main/docs/rules/public-api-slice-import.md): Check whether import is performed via public API.


