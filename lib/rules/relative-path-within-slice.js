/**
 * @fileoverview Check whether import path within a slice is relative
 * @author Eugene Skrobov
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const {removeAlias} = require("../helpers/removeAlias");
const {isPathShouldBeRelative} = require("../helpers/isPathShouldBeRelative");
const {isPathRelative} = require("../helpers/isPathRelative");
const {parseAliasOption} = require("../helpers/parseAliasOption");

const NodeType = {
  ImportDeclaration: 'ImportDeclaration',
  ExportNamedDeclaration: 'ExportNamedDeclaration',
};

const isTargetDeclaration = (node) => {
  const {type} = node;

  return type === NodeType.ImportDeclaration || type === NodeType.ExportNamedDeclaration;
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
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string',
          }
        }
      }
    ], // Add a schema if the rule has options
  },

  create(context) {
    return {
      Program(program) {
        const body = program.body;

        if (!Array.isArray(body)) {
          return;
        }

        body.forEach((node) => {
          if (!isTargetDeclaration(node)) {
            return;
          }

          if (!node.source) {
            return;
          }

          const alias = parseAliasOption(context.options);
          const importTo = removeAlias(node.source.value, alias);

          if (!importTo) {
            return;
          }

          if (isPathRelative(importTo)) {
            return;
          }

          const fromFileName = context.getFilename();

          if (isPathShouldBeRelative(fromFileName, importTo)) {
            context.report({
              node,
              messageId: 'shouldBeRelative',
            });
          }
        })
      }
    };
  },
};
