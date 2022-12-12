"use strict";

const path = require("path");
const {Layer} = require("../constants");
const {isFSDLayer} = require("./isFSDLayer");
const {isPathRelative} = require("./isPathRelative");

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
};

module.exports = {
  isPathShouldBeRelative
};
