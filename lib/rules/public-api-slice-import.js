/**
 * @fileoverview Import from a slice should be performed via public API only. Import from slice internals is forbidden.
 * @author Eugene Skrobov
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const micromatch = require('micromatch');
const { isPathShouldBeRelative } = require('../helpers/isPathShouldBeRelative');
const { isPathRelative } = require('../helpers/isPathRelative');
const { isFSDLayer } = require('../helpers/isFSDLayer');
const { parseOption } = require('../helpers/parseOption');
const { getCurrentFilePath } = require('../helpers/getCurrentFilePath');
const { removeProjectDir } = require('../helpers/removeProjectDir');

// eslint-disable-next-line max-len
const DESCRIPTION = 'Import from a slice should be performed via public API only. Import from slice internals is forbidden.';

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`,
    messages: {
      shouldBePublicApi: DESCRIPTION,
      shouldBeTestingApi: 'Should be testing API',
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
          projectDir: {
            type: 'string',
          },
          ignoreLayers: {
            type: 'array',
          },
          testFiles: {
            type: 'array',
          },
          insideProjectOnly: {
            type: 'boolean',
          },
        },
      },
    ], // Add a schema if the rule has options
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const importSourcePath = removeProjectDir(node.source.value, context);

        if (isPathRelative(importSourcePath)) {
          return;
        }

        const currentFilePath = getCurrentFilePath(context);

        if (!currentFilePath) {
          return;
        }

        if (isPathShouldBeRelative(currentFilePath, importSourcePath)) {
          return;
        }

        const [importSourceLayer, importSourceSlice, ...importSourceInternals] = importSourcePath.split('/');

        if (!importSourceLayer || !importSourceSlice || !isFSDLayer(importSourceLayer)) {
          return;
        }

        const ignoredLayers = parseOption(context.options, 'ignoreLayers') || [];

        const isIgnoredLayer = ignoredLayers.some((layer) => layer === importSourceLayer);

        if (isIgnoredLayer) {
          return;
        }

        const testFiles = parseOption(context.options, 'testFiles') || [];
        const isCurrentFileTesting = testFiles.some((pattern) => micromatch.isMatch(currentFilePath, pattern));

        if (!isCurrentFileTesting) {
          if (importSourceInternals.length && !isCurrentFileTesting) {
            context.report({
              node,
              messageId: 'shouldBePublicApi',
            });
          }

          return;
        }

        const [testingApi, ...testingImportSourceInternals] = importSourceInternals;

        if (testingApi !== 'testing' || testingImportSourceInternals.length) {
          context.report({
            node,
            messageId: 'shouldBeTestingApi',
          });
        }
      },
    };
  },
};
