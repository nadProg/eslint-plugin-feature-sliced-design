/**
 * @fileoverview Import is allowed from more abstract layer only
 * @author Eugene Skrobov
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const { parseOption } = require('../helpers/parseOption');
const { removeAlias } = require('../helpers/removeAlias');
const { isPathRelative } = require('../helpers/isPathRelative');
const { getCurrentFilePath } = require('../helpers/getCurrentFilePath');
const { isPathShouldBeRelative } = require('../helpers/isPathShouldBeRelative');
const { isFSDLayer } = require('../helpers/isFSDLayer');
const { isUnderLayer } = require('../helpers/isUnderLayer');

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
          ignoreLayers: {
            type: 'array',
          },
        },
      },
    ],
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

        const [importSourceLayer] = importSourcePath.split('/');

        if (!importSourceLayer || !isFSDLayer(importSourceLayer)) {
          return;
        }

        const ignoredLayers = parseOption(context.options, 'ignoreLayers') || [];

        const isIgnoredLayer = ignoredLayers.some((layer) => layer === importSourceLayer);

        if (isIgnoredLayer) {
          return;
        }

        const [currentFileLayer] = currentFilePath.split('\\');

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
