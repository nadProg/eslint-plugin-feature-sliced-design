'use strict';

const { parseOption } = require('./parseOption');

const getProjectDirOption = (context) => parseOption(context.options, 'projectDir') || 'src';

module.exports = {
  getProjectDirOption,
};
