/**
 * @fileoverview Check whether import path within a slice is relative
 * @author Eugene Skrobov
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/relative-path-within-slice');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('relative-path-within-slice', rule, {
  valid: [
    {
      filename: 'C:\\study\\fsd\\src\\features\\articleRating\\index.ts',
      code: 'import { ArticleRating } from \'./ui/ArticleRating/ArticleRating\';',
    },
    {
      filename: 'C:\\study\\fsd\\project\\features\\articleRating\\index.ts',
      code: 'import { ArticleRating } from \'./ui/ArticleRating/ArticleRating\';',
      options: [{ projectDir: 'project' }],
    },
    {
      filename: 'C:/study/fsd/src/features/articleRating/index.ts',
      code: 'import { ArticleRating } from \'./ui/ArticleRating/ArticleRating\';',
    },
    {
      filename: 'C:/study/fsd/project/features/articleRating/index.ts',
      code: 'import { ArticleRating } from \'./ui/ArticleRating/ArticleRating\';',
      options: [{ projectDir: 'project' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\shared\\ui\\ArticleRating\\index.ts',
      code: 'import { ArticleRating } from \'./ui/ArticleRating/ArticleRating\';',
    },
    {
      filename: 'C:\\study\\fsd\\project\\shared\\ui\\ArticleRating\\index.ts',
      code: 'import { ArticleRating } from \'./ui/ArticleRating/ArticleRating\';',
      options: [{ projectDir: 'project' }],
    },
    {
      filename: 'C:/study/fsd/src/shared/ui/ArticleRating/index.ts',
      code: 'import { ArticleRating } from \'./ui/ArticleRating/ArticleRating\';',
    },
    {
      filename: 'C:/study/fsd/project/shared/ui/ArticleRating/index.ts',
      code: 'import { ArticleRating } from \'./ui/ArticleRating/ArticleRating\';',
      options: [{ projectDir: 'project' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\shared\\ui\\ArticleRating\\index.ts',
      code: 'import { ArticleRating } from \'shared/ui/AnotherShared\';',
    },
    {
      filename: 'C:/study/fsd/src/shared/ui/ArticleRating/index.ts',
      code: 'import { ArticleRating } from \'shared/ui/AnotherShared\';',
    },
    {
      filename: 'C:\\study\\fsd\\src\\shared\\ui\\ArticleRating\\index.ts',
      code: 'import { ArticleRating } from \'@/shared/ui/AnotherShared\';',
      options: [{ alias: '@' }],
    },
    {
      filename: 'C:/study/fsd/src/shared/ui/ArticleRating/index.ts',
      code: 'import { ArticleRating } from \'@/shared/ui/AnotherShared\';',
      options: [{ alias: '@' }],
    },
    {
      filename: 'C:\\study\\fsd\\project\\shared\\ui\\ArticleRating\\index.ts',
      code: 'import { ArticleRating } from \'@/shared/ui/AnotherShared\';',
      options: [{ alias: '@', projectDir: 'project' }],
    },
    {
      filename: 'C:/study/fsd/project/shared/ui/ArticleRating/index.ts',
      code: 'import { ArticleRating } from \'@/shared/ui/AnotherShared\';',
      options: [{ alias: '@', projectDir: 'project' }],
    },
  ],

  invalid: [
    {
      filename: 'C:\\study\\fsd\\src\\features\\articleRating\\index.ts',
      code: 'import { ArticleRating } from \'features/articleRating/ui/ArticleRating/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
    },
    {
      filename: 'C:\\study\\fsd\\project\\features\\articleRating\\index.ts',
      code: 'import { ArticleRating } from \'features/articleRating/ui/ArticleRating/ArticleRating\';',
      options: [{ projectDir: 'project' }],
      errors: [{ messageId: 'shouldBeRelative' }],
    },
    {
      filename: 'C:/study/fsd/src/features/articleRating/index.ts',
      code: 'import { ArticleRating } from \'features/articleRating/ui/ArticleRating/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
    },
    {
      filename: 'C:/study/fsd/project/features/articleRating/index.ts',
      code: 'import { ArticleRating } from \'features/articleRating/ui/ArticleRating/ArticleRating\';',
      options: [{ projectDir: 'project' }],
      errors: [{ messageId: 'shouldBeRelative' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\features\\articleRating\\index.ts',
      code: 'export { ArticleRating } from \'features/articleRating/ui/ArticleRating/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
    },
    {
      filename: 'C:/study/fsd/src/features/articleRating/index.ts',
      code: 'export { ArticleRating } from \'features/articleRating/ui/ArticleRating/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\features\\articleRating\\index.ts',
      code: 'export { ArticleRating } from \'@/features/articleRating/ui/ArticleRating/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
      options: [{ alias: '@' }],
    },
    {
      filename: 'C:/study/fsd/src/features/articleRating/index.ts',
      code: 'export { ArticleRating } from \'@/features/articleRating/ui/ArticleRating/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
      options: [{ alias: '@' }],
    },
    {
      filename: 'C:/study/fsd/project/features/articleRating/index.ts',
      code: 'export { ArticleRating } from \'@/features/articleRating/ui/ArticleRating/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
      options: [{ alias: '@', projectDir: 'project' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\shared\\ui\\ArticleRating\\index.ts',
      code: 'import { ArticleRating } from \'shared/ui/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
    },
    {
      filename: 'C:/study/fsd/src/shared/ui/ArticleRating/index.ts',
      code: 'import { ArticleRating } from \'shared/ui/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
    },
    {
      filename: 'C:/study/fsd/src/app/ui/ArticleRating/index.ts',
      code: 'import { ArticleRating } from \'app/ui/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
    },
    {
      filename: 'C:/study/fsd/project/app/ui/ArticleRating/index.ts',
      code: 'import { ArticleRating } from \'app/ui/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
      options: [{ projectDir: 'project' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\app\\ui\\ArticleRating\\index.ts',
      code: 'import { ArticleRating } from \'app/ui/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\shared\\ui\\ArticleRating\\index.ts',
      code: 'import { ArticleRating } from \'@/shared/ui/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
      options: [{ alias: '@' }],
    },
    {
      filename: 'C:/study/fsd/src/shared/ui/ArticleRating/index.ts',
      code: 'import { ArticleRating } from \'@/shared/ui/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
      options: [{ alias: '@' }],
    },
    {
      filename: 'C:/study/fsd/project/shared/ui/ArticleRating/index.ts',
      code: 'import { ArticleRating } from \'@/shared/ui/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
      options: [{ alias: '@', projectDir: 'project' }],
    },
    {
      filename: 'C:/study/fsd/src/app/ui/ArticleRating/index.ts',
      code: 'import { ArticleRating } from \'@/app/ui/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
      options: [{ alias: '@' }],
    },
    {
      filename: 'C:/study/fsd/project/app/ui/ArticleRating/index.ts',
      code: 'import { ArticleRating } from \'@/app/ui/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
      options: [{ alias: '@', projectDir: 'project' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\app\\ui\\ArticleRating\\index.ts',
      code: 'import { ArticleRating } from \'@/app/ui/ArticleRating\';',
      errors: [{ messageId: 'shouldBeRelative' }],
      options: [{ alias: '@' }],
    },
  ],
});
