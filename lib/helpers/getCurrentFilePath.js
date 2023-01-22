const { getProjectDirOption } = require('./getProjectDirOption');

const getCurrentFilePath = (context) => {
  const currentFilePath = context.getFilename().replaceAll('\\', '/');

  const projectDir = getProjectDirOption(context);

  const [, fromPath = ''] = currentFilePath.split(`${projectDir}/`);

  return fromPath;
};

module.exports = {
  getCurrentFilePath,
};
