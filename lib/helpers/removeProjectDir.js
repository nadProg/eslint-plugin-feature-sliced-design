'use strict';

const { getAliasOption } = require('./getAliasOption');
const { getProjectDirOption } = require('./getProjectDirOption');
const { removeAlias } = require('./removeAlias');

const removeProjectDir = (path, context) => {
  if (!path) {
    return path;
  }

  const alias = getAliasOption(context);

  const isPathWithAlias = path.startsWith(alias);

  if (alias && isPathWithAlias) {
    return removeAlias(path, alias);
  }

  const projectDir = getProjectDirOption(context);

  const isPathWithProjectDir = path.startsWith(projectDir);

  if (projectDir && isPathWithProjectDir) {
    return path.replace(`${projectDir}/`, '');
  }

  return path;
};

module.exports = {
  removeProjectDir,
};
