'use strict';

const removeAlias = (path, alias) => {
  if (!path || !alias) {
    return path;
  }

  return path.replace(`${alias}/`, '');
};

module.exports = {
  removeAlias,
};
