# eslint-plugin-feature-sliced-design

An ESLint plugin for enforcing best practices of the [Feature-Sliced Design](https://feature-sliced.design/) methodology in your project.

## Installation

```sh
npm install --save-dev eslint-plugin-feature-sliced-design
```

## Usage

Add `feature-sliced-design` to the plugins section of your ESLint configuration:

```json
{
  "plugins": ["feature-sliced-design"],
  "rules": {
    "feature-sliced-design/layers-hierarchy": [
      "error",
      {
        "alias": "@",
        "projectDir": "src"
      }
    ],
    "feature-sliced-design/public-api-slice-import": [
      "error",
      {
        "alias": "@",
        "projectDir": "src",
        "ignoreLayers": ["shared", "app"],
        "insideProjectOnly": false
      }
    ],
    "feature-sliced-design/relative-path-within-slice": [
      "error",
      { 
        "alias": "@",
        "projectDir": "src"
      }
    ]
  }
}
```

## Rules

### `feature-sliced-design/layers-hierarchy`
Enforces the correct import hierarchy based on Feature-Sliced Design principles.

[More detailed description](https://github.com/nadProg/eslint-plugin-feature-sliced-design/blob/main/docs/rules/layers-hierarchy.md)

### `feature-sliced-design/public-api-slice-import`
Enforces that slices can only be imported via their public API.

[More detailed description](https://github.com/nadProg/eslint-plugin-feature-sliced-design/blob/main/docs/rules/public-api-slice-import.md)

### `feature-sliced-design/relative-path-within-slice`
Ensures that all imports within a slice use relative paths instead of absolute aliases.

[More detailed description](https://github.com/nadProg/eslint-plugin-feature-sliced-design/blob/main/docs/rules/relative-path-within-slice.md)

## Configuration Options
- `alias`: The alias used for imports (e.g., `@`). No alias by default.
- `projectDir`: The root directory of your frontend project. `src` by default.
- `ignoreLayers` (for `public-api-slice-import`): Layers that should be ignored in rule enforcement.
- `insideProjectOnly` (for `public-api-slice-import`): If `true`, it's allowed to import from non-public API in files outside project directory.

## License
ISC


