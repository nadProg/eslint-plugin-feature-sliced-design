"use strict";

const {LAYERS} = require("../constants");
const isFSDLayer = (layer) => LAYERS.includes(layer);

module.exports = {
  isFSDLayer
}