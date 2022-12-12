/**
 * @fileoverview Import from a slice should be performed via public API only. Import from slice internals is forbidden.
 * @author Eugene Skrobov
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const {removeAlias} = require("../helpers/removeAlias");
const {isPathShouldBeRelative} = require("../helpers/isPathShouldBeRelative");
const {isPathRelative} = require("../helpers/isPathRelative");
const {isFSDLayer} = require("../helpers/isFSDLayer");
const {parseOption} = require("../helpers/parseOption");

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`,
    messages: {
      shouldBePublicApi: 'Import from a slice should be performed via public API only. Import from slice internals is forbidden.',
    },
    docs: {
      description: "Import from a slice should be performed via public API only. Import from slice internals is forbidden.",
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
            type: 'array'
          }
        }
      }
    ], // Add a schema if the rule has options
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const alias = parseOption(context.options, 'alias');
        const importFrom = removeAlias(node.source.value, alias);

        if (isPathRelative(importFrom)) {
          return;
        }

        const fromFileName = context.getFilename();

        if (isPathShouldBeRelative(fromFileName, importFrom)) {
          return;
        }

        const [fromLayer, fromSlice, ...importInternals] = importFrom.split('/');

        if (!fromLayer || !fromSlice || !isFSDLayer(fromLayer)) {
          return;
        }

        const ignoreLayers = parseOption(context.options, 'ignoreLayers') || [];
        console.log(ignoreLayers);

        const isIgnoredLayer = ignoreLayers.some((layer) => layer === fromLayer);

        if (isIgnoredLayer) {
          return;
        }

        if (importInternals.length) {
          context.report({
            node,
            messageId: 'shouldBePublicApi',
          });
        }
      }
    };
  },
};
