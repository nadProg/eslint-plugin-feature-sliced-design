# feature-sliced-design/layers-hierarchy

This ESLint rule enforces the correct import hierarchy in projects following the Feature-Sliced Design (FSD) methodology.

## Purpose
The rule ensures that modules from higher layers do not import modules from lower layers, maintaining a clean architecture and separation of concerns.

### Allowed Import Hierarchy
- `shared` can be imported anywhere.
- `entities` can use `shared` and `entities`, but not `features`, `widgets`, `pages`, or `app`.
- `features` can use `shared` and `entities`, but not `widgets`, `pages`, or `app`.
- `widgets` can use `shared`, `entities`, and `features`, but not `pages` or `app`.
- `pages` can use `shared`, `entities`, `features`, and `widgets`, but not `app`.
- `processes` can use `shared`, `entities`, `features`, and `widgets`, but not `processess` or `app`.
- `app` can use `shared`, `entities`, `features`, `widgets`, `pages` and `processess`.

### Options
- `alias`: Allows using a custom alias (e.g., `@/shared/ui/Component`). Default no alias.
- `projectDir`: Defines the root directory for the project. Default `src`.
- `ignoredImports`: Skips validation for specific imports.
- `ignoredFiles`: Skips validation for specific files.

Example configuration with options:

```json
{
  "rules": {
    "feature-sliced-design/layers-hierarchy": [
      "error",
      { 
        "alias": "@",
        "ignoredImports": ["**/entities/Entity"],
        "ignoredFiles": ["**/component/*.tsx"],
        "projectDir": "frontend"
      }
    ]
  }
}
```

## Examples

### ✅ Valid imports
```ts
// file: src/features/Feature/file.tsx
import { Entity } from 'entities/Entity';
import { SharedComponent } from 'shared/ui/Component';

// file: src/features/Feature/file.tsx
import { Entity } from '@/entities/Entity';
import { SharedComponent } from '@/shared/ui/Component';
```

### ❌ Invalid imports
```ts
// file: src/shared/ui/Component/file.tsx
import { Entity } from 'entities/Entity';

// file: src/shared/ui/Component/file.tsx
import { Entity } from '@/entities/Entity';
```

This rule ensures strict adherence to the defined layer hierarchy, preventing architecture violations in large-scale applications.

