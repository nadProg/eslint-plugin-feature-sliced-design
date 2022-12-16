const path = require('path');

const getCurrentFilePath = (context) => {
  const currentFilePath = context.getFilename();

  const [, fromPath = ''] = path.toNamespacedPath(currentFilePath).split('src\\');

  return fromPath;
};

module.exports = {
  getCurrentFilePath,
};
