"use strict";

const parseAliasOption = (options) => {
  if (!Array.isArray(options)) {
    return;
  }

  const aliasOption = options[0];

  if (!aliasOption) {
    return;
  }

  return aliasOption.alias;
};

module.exports = {
  parseAliasOption
};
