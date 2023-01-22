const { getProjectDirOption } = require('./getProjectDirOption');

const getCurrentFilePath = (context) => {
  const currentFilePath = context.getFilename().replaceAll('\\', '/');

  const projectDir = getProjectDirOption(context);

  const importParts = currentFilePath.split(`/${projectDir}/`);

  const fromPath = importParts[importParts.length - 1] || '';

  return fromPath;
};

module.exports = {
  getCurrentFilePath,
};
