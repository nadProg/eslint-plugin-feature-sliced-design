/**
 * @fileoverview Check whether import path within a slice is relative
 * @author Eugene Skrobov
 */
"use strict";

const path = require('path');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const Layer = {
  Shared: 'shared',
  Entities: 'entities',
  Features: 'features',
  Widgets: 'widgets',
  Pages: 'pages',
  Processes: 'processes',
  App: 'app',
};

const Layers = Object.values(Layer);

const isFSDLayer = (layer) => Layers.includes(layer);

const isPathRelative = (path) => path.startsWith('.');

const isPathShouldBeRelative = (from, to) => {
  if (isPathRelative(to)) {
    return false;
  }

  const [toLayer, toSlice, toSubSlice] = to.split('/');

  if (!toLayer || !toSlice || !isFSDLayer(toLayer)) {
    return false;
  }

  const [, fromPath] = path.toNamespacedPath(from).split('src\\');

  const [fromLayer, fromSlice, fromSubSlice] = fromPath.split('\\')

  if (!fromLayer || !fromSlice || !isFSDLayer(fromLayer)) {
    return false;
  }

  const isSameLayer = fromLayer === toLayer;

  if (!isSameLayer) {
    return false;
  }

  const isWithinAppLayer = fromLayer === Layer.App;
  const isWithinSharedLayer = fromLayer === Layer.Shared;

  const isSubSlice = isWithinSharedLayer || isWithinAppLayer;

  if (isSubSlice) {
    if (!fromSubSlice || !toSubSlice) {
      return false;
    }

    return fromSubSlice === toSubSlice
  }

  return fromSlice === toSlice;
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`,
    messages: {
      shouldBeRelative: 'Path within a slice should be relative',
    },
    docs: {
      description: "Check whether import path within a slice is relative",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const importTo = node.source.value;

        const fromFileName = context.getFilename();

        if (isPathShouldBeRelative(fromFileName, importTo)) {
          context.report({
            node,
            messageId: 'shouldBeRelative',
          });
        }
      }
    };
  },
};
