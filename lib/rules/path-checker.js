/**
 * @fileoverview Check import paths conforming to feature-sliced design
 * @author Eugene Skrobov
 */
"use strict";

const path = require('path');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const LAYERS = [
  'shared',
  'entities',
  'features',
  'widgets',
  'pages',
  'processes',
  'app',
];

const SHARED_LAYER = LAYERS[0];

const isPathRelative = (path) => path.startsWith('.');

const isPathShouldBeRelative = (from, to) => {
  if (isPathRelative(to)) {
    return false;
  }

  const [toLayer, toSlice, toSubSlice] = to.split('/');

  if (!toLayer || !toSlice || !LAYERS.includes(toLayer)) {
    return false;
  }

  const [, fromPath] = path.toNamespacedPath(from).split('src\\');

  const [fromLayer, fromSlice, fromSubSlice] = fromPath.split('\\')

  if (!fromLayer || !fromSlice || !LAYERS.includes(fromLayer)) {
    return false;
  }

  const isSameLayer = fromLayer === toLayer;
  const isWithinSharedLayer = fromLayer === SHARED_LAYER && toLayer === SHARED_LAYER;

  if (isWithinSharedLayer) {
    if (!fromSubSlice || !toSubSlice) {
      return false;
    }
  }

  const isSameSlice = isWithinSharedLayer ? fromSubSlice === toSubSlice : fromSlice === toSlice;

  return isSameLayer && isSameSlice;
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Check import paths conforming to feature-sliced design",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
      ImportDeclaration(node) {
        const importTo = node.source.value;

        const fromFileName = context.getFilename();

        if (isPathShouldBeRelative(fromFileName, importTo)) {
          context.report(node, 'Path within slice should be relative ');
        }
      }
    };
  },
};
