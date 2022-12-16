'use strict';

const { Layer } = require('../constants');
const { isFSDLayer } = require('./isFSDLayer');

const isPathShouldBeRelative = (currentFilePath, importSourcePath) => {
  const [
    importSourceLayer,
    importSourceSlice,
    importSourceSubSlice,
  ] = importSourcePath.split('/');

  if (!importSourceLayer || !importSourceSlice || !isFSDLayer(importSourceLayer)) {
    return false;
  }

  const [currentFileLayer, currentFileSlice, currentFileSubSlice] = currentFilePath.split('\\');

  if (!currentFileLayer || !currentFileSlice || !isFSDLayer(currentFileLayer)) {
    return false;
  }

  const isSameLayer = currentFileLayer === importSourceLayer;

  if (!isSameLayer) {
    return false;
  }

  const isWithinSharedLayer = currentFileLayer === Layer.Shared;

  const isSubSlice = isWithinSharedLayer;

  if (isSubSlice) {
    if (!currentFileSubSlice || !importSourceSubSlice) {
      return false;
    }

    return currentFileSubSlice === importSourceSubSlice;
  }

  return currentFileSlice === importSourceSlice;
};

module.exports = {
  isPathShouldBeRelative,
};
