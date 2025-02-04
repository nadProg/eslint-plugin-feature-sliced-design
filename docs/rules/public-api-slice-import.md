# feature-sliced-design/public-api-slice-import

This ESLint rule enforces the correct import structure within a Feature-Sliced Design (FSD) architecture. It ensures that only Public API imports are used, preventing direct imports from internal module directories.

## Purpose

This rule helps maintain a clean and structured import hierarchy in projects using Feature-Sliced Design. It prevents breaking encapsulation by ensuring that only public APIs are used in imports, improving code maintainability and scalability.

### Supported Public API
- `entities`
- `features`
- `widgets`
- `pages`
- `processes`

`shared` and `app` layers Public API control may not work correctly. It's recommended to add them into `ignoreLayers`.
In the future versions Public API in `shared` and `layers` will not be checked. 

## Options

- `alias`: Allows using a custom alias (e.g., `@/shared/ui/Component`). Default no alias.
- `projectDir`: Defines the root directory for the project. Default `src`.
- `ignoreLayers`: Layers that should be ignored in rule enforcement. Default [].
- `insideProjectOnly`: If `true`, it's allowed to import from non-public API in files outside project directory. Default `false`.

Example configuration with options:

```js
module.exports = {
  rules: {
    "feature-sliced-design/public-api-slice-import": ["error", {
      alias: "@",
      projectDir: "src",
      ignoreLayers: ["shared", "app"],
      insideProjectOnly: true,
    }],
  },
};
```

### ✅ Valid Examples

```ts
// Allowed import from public API
import { ArticleRating } from 'features/ArticleRating';

// Allowed import using alias
import { ArticleRating } from '@/features/ArticleRating';
```

### ❌ Invalid Examples

```ts
// Disallowed import from internal module directory
import { ArticleRating } from 'features/Feature/ui';
import { ArticleRating } from '@/features/Feature/ui';
import { ArticleRating } from '@/features/Feature/ui/View';
```
