'use strict';

const { parseOption } = require('./parseOption');

const getAliasOption = (context) => parseOption(context.options, 'alias');

module.exports = {
  getAliasOption,
};
