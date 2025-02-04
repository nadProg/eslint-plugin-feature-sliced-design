# feature-sliced-design/relative-path-within-slice

This ESLint rule enforces the use of relative paths within feature slices, preventing absolute or aliased imports inside the same slice.

## Purpose

This rule ensures that files within the same feature slice use relative imports instead of absolute or aliased paths.

## Options

- `alias`: Allows using a custom alias (e.g., `@/shared/ui/Component`). Default no alias.
- `projectDir`: Defines the root directory for the project. Default `src`.

Example configuration with options:

```js
module.exports = {
  rules: {
      "feature-sliced-design/relative-path-within-slice": [
          "error",
          {
              "alias": "@",
              "projectDir": "src"
          }
      ]
  },
};
```

### ✅ Valid Examples

```js
// file: src/features/ArticleRating/file.tsx
import { ArticleRating } from './ui/ArticleRating/ui.tsx';
```

```js
// file: src/features/ArticleRating/file.tsx
import { Article } from '@/entities/Article';
```

### ❌ Invalid Examples

```js
// file: src/features/ArticleRating/file.tsx
import { Component } from 'src/features/ArticleRating/ui/component.tsx';
```

```js
// file: src/features/ArticleRating/file.tsx
import { Component } from '@/features/ArticleRating/ui/component.tsx';
```

This ensures that developers follow the relative import convention within feature slices.
