'use strict';

const parseOption = (options, optionName = '') => {
  if (!Array.isArray(options)) {
    return null;
  }

  const option = options[0];

  if (!option) {
    return null;
  }

  return option[optionName];
};

module.exports = {
  parseOption,
};
