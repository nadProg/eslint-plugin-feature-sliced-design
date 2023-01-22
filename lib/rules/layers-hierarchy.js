/**
 * @fileoverview Import is allowed from more abstract layer only
 * @author Eugene Skrobov
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const micromatch = require('micromatch');
const { parseOption } = require('../helpers/parseOption');
const { removeAlias } = require('../helpers/removeAlias');
const { isPathRelative } = require('../helpers/isPathRelative');
const { getCurrentFilePath } = require('../helpers/getCurrentFilePath');
const { isPathShouldBeRelative } = require('../helpers/isPathShouldBeRelative');
const { isFSDLayer } = require('../helpers/isFSDLayer');
const { isUnderLayer } = require('../helpers/isUnderLayer');
const { getAliasOption } = require('../helpers/getAliasOption');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`,
    messages: {
      underLayerImportForbidden: 'Import is allowed from more abstract layer only',
    },
    docs: {
      description: 'Import is allowed from more abstract layer only',
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
          ignoredImports: {
            type: 'array',
          },
          ignoredFiles: {
            type: 'array',
          },
        },
      },
    ],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const alias = getAliasOption(context);
        const importSourcePath = removeAlias(node.source.value, alias);

        const ignoredImports = parseOption(context.options, 'ignoredImports') || [];
        const isIgnoredImport = ignoredImports.some((pattern) => micromatch.isMatch(importSourcePath, pattern));

        if (isIgnoredImport) {
          return;
        }

        if (isPathRelative(importSourcePath)) {
          return;
        }

        const currentFilePath = getCurrentFilePath(context);

        const ignoredFiles = parseOption(context.options, 'ignoredFiles') || [];
        const isIgnoredFile = ignoredFiles.some((pattern) => micromatch.isMatch(currentFilePath, pattern));

        if (isIgnoredFile) {
          return;
        }

        const [currentFileLayer] = currentFilePath.split('/');

        if (!currentFileLayer || !isFSDLayer(currentFileLayer)) {
          return;
        }

        if (isPathShouldBeRelative(currentFilePath, importSourcePath)) {
          return;
        }

        const [importSourceLayer] = importSourcePath.split('/');

        if (!importSourceLayer || !isFSDLayer(importSourceLayer)) {
          return;
        }

        const ignoredLayers = parseOption(context.options, 'ignoreLayers') || [];

        const isIgnoredLayer = ignoredLayers.some((layer) => layer === importSourceLayer);

        if (isIgnoredLayer) {
          return;
        }

        if (!isUnderLayer(currentFileLayer, importSourceLayer)) {
          context.report({
            node,
            messageId: 'underLayerImportForbidden',
          });
        }
      },
    };
  },
};
