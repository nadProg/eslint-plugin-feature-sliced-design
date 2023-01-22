/**
 * @fileoverview Check whether import path within a slice is relative
 * @author Eugene Skrobov
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const { isPathShouldBeRelative } = require('../helpers/isPathShouldBeRelative');
const { isPathRelative } = require('../helpers/isPathRelative');
const { getCurrentFilePath } = require('../helpers/getCurrentFilePath');
const { removeProjectDir } = require('../helpers/removeProjectDir');

const NodeType = {
  ImportDeclaration: 'ImportDeclaration',
  ExportNamedDeclaration: 'ExportNamedDeclaration',
};

const isIgnoredNode = (node) => {
  const { type, source } = node;

  if (type !== NodeType.ImportDeclaration && type !== NodeType.ExportNamedDeclaration) {
    return true;
  }

  return !source;
};

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`,
    messages: {
      shouldBeRelative: 'Path within a slice should be relative',
    },
    docs: {
      description: 'Check whether import path within a slice is relative',
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
        },
      },
    ], // Add a schema if the rule has options
  },

  create(context) {
    return {
      Program(program) {
        const { body } = program;

        if (!Array.isArray(body)) {
          return;
        }

        body.forEach((node) => {
          if (isIgnoredNode(node)) {
            return;
          }

          const importSourcePath = removeProjectDir(node.source.value, context);

          if (!importSourcePath) {
            return;
          }

          if (isPathRelative(importSourcePath)) {
            return;
          }

          const currentFilePath = getCurrentFilePath(context);

          if (isPathShouldBeRelative(currentFilePath, importSourcePath)) {
            context.report({
              node,
              messageId: 'shouldBeRelative',
            });
          }
        });
      },
    };
  },
};
