'use strict';

const isPathRelative = (path) => path.startsWith('.');

module.exports = {
  isPathRelative,
};
