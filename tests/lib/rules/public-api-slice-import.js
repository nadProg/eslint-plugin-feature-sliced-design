/**
 * @fileoverview Import from a slice should be performed via public API only. Import from slice internals is forbidden.
 * @author Eugene Skrobov
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/public-api-slice-import');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('public-api-slice-import', rule, {
  valid: [
    {
      filename: 'C:\\study\\fsd\\src\\widgets\\Widget\\ui\\View\\View.tsx',
      code: "import { ArticleRating } from 'features/ArticleRating';",
    },
    {
      filename: 'C:\\study\\fsd\\src\\features\\Feature\\index.ts',
      code: "import { ArticleRating } from 'features/Feature/ui';",
    },
    {
      filename: 'C:\\study\\fsd\\src\\features\\Feature\\index.ts',
      code: "import { ArticleRating } from 'features/Feature/ui/View';",
    },
    {
      filename: 'C:\\study\\fsd\\src\\widgets\\Widget\\ui\\View\\View.tsx',
      code: "import { ArticleRating } from '@/features/ArticleRating';",
      options: [{ alias: '@' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\features\\Feature\\index.ts',
      code: "import { ArticleRating } from '@/features/Feature/ui';",
      options: [{ alias: '@' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\features\\Feature\\index.ts',
      code: "import { ArticleRating } from '@/features/Feature/ui/View';",
      options: [{ alias: '@' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\widgets\\Widget\\ui\\View\\View.tsx',
      code: "import { ArticleRating } from 'features/Feature/ui';",
      options: [{ ignoreLayers: ['features'] }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\widgets\\Widget\\ui\\View\\View.tsx',
      code: "import { ArticleRating } from '@/features/Feature/ui';",
      options: [{ alias: '@', ignoreLayers: ['features'] }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\widgets\\Widget\\ui\\View\\View.test.tsx',
      code: "import { ArticleRating } from '@/features/Feature/testing';",
      options: [{ alias: '@', testFiles: ['**/*.test.tsx'] }],
    },
    {
      filename: '\\home\\runner\\work\\fsd\\fsd\\src\\features\\List\\ui\\List\\List.stories.tsx',
      code: "import { Article } from 'entities/Article/testing';",
      options: [{ testFiles: ['**/*.stories.tsx'] }],
    },
    {
      filename: '\\home\\runner\\work\\fsd\\fsd\\src\\features\\List\\ui\\List\\List.stories.tsx',
      code: "import { Article } from '@/entities/Article/testing';",
      options: [{ alias: '@', testFiles: ['**/*.stories.tsx'] }],
    },
    {
      filename: '/home/runner/work/fsd/fsd/src/features/List/ui/List/List.stories.tsx',
      code: "import { Article } from 'entities/Article/testing';",
      options: [{ testFiles: ['**/*.stories.tsx'] }],
    },
    {
      filename: '/home/runner/work/fsd/fsd/project/features/List/ui/List/List.stories.tsx',
      code: "import { Article } from 'entities/Article/testing';",
      options: [{ testFiles: ['**/*.stories.tsx'], projectDir: 'project' }],
    },
    {
      filename: '/home/runner/work/fsd/fsd/src/features/List/ui/List/List.stories.tsx',
      code: "import { Article } from '@/entities/Article/testing';",
      options: [{ alias: '@', testFiles: ['**/*.stories.tsx'] }],
    },
  ],

  invalid: [
    {
      filename: 'C:\\study\\fsd\\src\\widgets\\Widget\\ui\\View\\View.tsx',
      code: "import { ArticleRating } from 'features/Feature/ui';",
      errors: [{ messageId: 'shouldBePublicApi' }],
    },
    {
      filename: 'C:\\study\\fsd\\project\\widgets\\Widget\\ui\\View\\View.tsx',
      code: "import { ArticleRating } from 'features/Feature/ui';",
      options: [{ projectDir: 'project' }],
      errors: [{ messageId: 'shouldBePublicApi' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\widgets\\Widget\\ui\\View\\View.tsx',
      code: "import { ArticleRating } from 'features/Feature/ui/View';",
      errors: [{ messageId: 'shouldBePublicApi' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\widgets\\Widget\\ui\\View\\View.tsx',
      code: "import { ArticleRating } from '@/features/Feature/ui';",
      errors: [{ messageId: 'shouldBePublicApi' }],
      options: [{ alias: '@' }],
    },
    {
      filename: 'C:\\study\\fsd\\project\\widgets\\Widget\\ui\\View\\View.tsx',
      code: "import { ArticleRating } from '@/features/Feature/ui';",
      errors: [{ messageId: 'shouldBePublicApi' }],
      options: [{ alias: '@', projectDir: 'project' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\widgets\\Widget\\ui\\View\\View.tsx',
      code: "import { ArticleRating } from '@/features/Feature/ui/View';",
      errors: [{ messageId: 'shouldBePublicApi' }],
      options: [{ alias: '@' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\widgets\\Widget\\ui\\View\\View.test.tsx',
      code: "import { ArticleRating } from '@/features/Feature';",
      options: [{ alias: '@', testFiles: ['**/*.test.tsx'] }],
      errors: [{ messageId: 'shouldBeTestingApi' }],
    },
    {
      filename: 'C:\\study\\fsd\\project\\widgets\\Widget\\ui\\View\\View.test.tsx',
      code: "import { ArticleRating } from '@/features/Feature';",
      options: [{ alias: '@', testFiles: ['**/*.test.tsx'], projectDir: 'project' }],
      errors: [{ messageId: 'shouldBeTestingApi' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\widgets\\Widget\\ui\\View\\View.test.tsx',
      code: "import { ArticleRating } from '@/features/Feature/testing/internal';",
      options: [{ alias: '@', testFiles: ['**/*.test.tsx'] }],
      errors: [{ messageId: 'shouldBeTestingApi' }],
    },
  ],
});
