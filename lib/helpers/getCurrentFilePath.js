const getCurrentFilePath = (context) => {
  const currentFilePath = context.getFilename().replaceAll('\\', '/');

  const [, fromPath = ''] = currentFilePath.split('src/');

  return fromPath;
};

module.exports = {
  getCurrentFilePath,
};
