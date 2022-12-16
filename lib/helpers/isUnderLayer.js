'use strict';

const { UnderLayers } = require('../constants');

const isUnderLayer = (currentLayer, layer) => {
  const underLayers = UnderLayers[currentLayer];

  return underLayers.includes(layer);
};

module.exports = {
  isUnderLayer,
};
