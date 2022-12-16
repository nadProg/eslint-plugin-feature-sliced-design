/**
 * @fileoverview Import is allowed from more abstract layer only
 * @author Eugene Skrobov
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/layers-hierarchy');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('layers-hierarchy', rule, {
  valid: [
    {
      filename: 'C:\\study\\fsd\\src\\shared\\ui\\Component\\file.tsx',
      code: "import { AnotherShared } from 'shared/ui/AnotherShared';",
    },
    {
      filename: 'C:\\study\\fsd\\src\\entities\\Entity\\file.tsx',
      code: "import { Shared } from 'shared/ui/Shared';",
    },
    {
      filename: 'C:\\study\\fsd\\src\\entities\\Entity\\file.tsx',
      code: "import { AnotherEntity } from 'entities/AnotherEntity';",
    },
    {
      filename: 'C:\\study\\fsd\\src\\features\\Feature\\file.tsx',
      code: "import { Entity } from 'entities/Entity';",
    },
    {
      filename: 'C:\\study\\fsd\\src\\widgets\\Widget\\file.tsx',
      code: "import { Feature } from 'features/Feature';",
    },
    {
      filename: 'C:\\study\\fsd\\src\\pages\\Page\\file.tsx',
      code: "import { Widget } from 'widgets/Widget';",
    },
    {
      filename: 'C:\\study\\fsd\\src\\app\\App\\file.tsx',
      code: "import { Page } from 'pages/Page';",
    },
  ],

  invalid: [
    {
      filename: 'C:\\study\\fsd\\src\\shared\\ui\\Component\\file.tsx',
      code: "import { Entity } from 'entities/Entity';",
      errors: [{ messageId: 'underLayerImportForbidden' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\entities\\Entity\\file.tsx',
      code: "import { Feature } from 'features/Feature';",
      errors: [{ messageId: 'underLayerImportForbidden' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\features\\Feature\\file.tsx',
      code: "import { Widget } from 'widgets/Widget';",
      errors: [{ messageId: 'underLayerImportForbidden' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\widgets\\Widget\\file.tsx',
      code: "import { Page } from 'pages/Page';",
      errors: [{ messageId: 'underLayerImportForbidden' }],
    },
    {
      filename: 'C:\\study\\fsd\\src\\pages\\Page\\file.tsx',
      code: "import { App } from 'app/App';",
      errors: [{ messageId: 'underLayerImportForbidden' }],
    },
  ],
});