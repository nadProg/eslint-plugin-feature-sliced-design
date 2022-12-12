"use strict";

const parseOption = (options, optionName = '') => {
  if (!Array.isArray(options)) {
    return;
  }

  const option = options[0];

  if (!option) {
    return;
  }

  return option[optionName];
};

module.exports = {
  parseOption
};
