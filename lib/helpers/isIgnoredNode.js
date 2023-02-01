'use strict';

const { ImportNodeType } = require('../constants');

const isIgnoredNode = (node) => {
  const { type, source } = node;

  if (type !== ImportNodeType.ImportDeclaration && type !== ImportNodeType.ExportNamedDeclaration) {
    return true;
  }

  return !source;
};

module.exports = {
  isIgnoredNode,
};
