/**
 * @fileoverview Import from a slice should be performed via public API only. Import from slice internals is forbidden.
 * @author Eugene Skrobov
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

// const micromatch = require('micromatch');
const { removeAlias } = require('../helpers/removeAlias');
const { isPathShouldBeRelative } = require('../helpers/isPathShouldBeRelative');
const { isPathRelative } = require('../helpers/isPathRelative');
const { isFSDLayer } = require('../helpers/isFSDLayer');
const { parseOption } = require('../helpers/parseOption');
const { getCurrentFilePath } = require('../helpers/getCurrentFilePath');

// eslint-disable-next-line max-len
const DESCRIPTION = 'Import from a slice should be performed via public API only. Import from slice internals is forbidden.';

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`,
    messages: {
      shouldBePublicApi: DESCRIPTION,
    },
    docs: {
      description: DESCRIPTION,
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string',
          },
          ignoreLayers: {
            type: 'array',
          },
          testFiles: {
            type: 'array',
          },
        },
      },
    ], // Add a schema if the rule has options
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const alias = parseOption(context.options, 'alias');
        const importSourcePath = removeAlias(node.source.value, alias);

        if (isPathRelative(importSourcePath)) {
          return;
        }

        const currentFilePath = getCurrentFilePath(context);

        if (isPathShouldBeRelative(currentFilePath, importSourcePath)) {
          return;
        }

        const [importSourceLayer, importSourceSlice, ...importSourceInternals] = importSourcePath.split('/');

        if (!importSourceLayer || !importSourceSlice || !isFSDLayer(importSourceLayer)) {
          return;
        }

        const ignoreLayers = parseOption(context.options, 'ignoreLayers') || [];

        const isIgnoredLayer = ignoreLayers.some((layer) => layer === importSourceLayer);

        if (isIgnoredLayer) {
          return;
        }

        // const testFiles = parseOption(context.options, 'testFiles') || [];
        // const isCurrentFileTesting = testFiles.some((pattern) => micromatch.isMatch(currentFileName, pattern));

        if (importSourceInternals.length) {
          context.report({
            node,
            messageId: 'shouldBePublicApi',
          });
        }
      },
    };
  },
};
