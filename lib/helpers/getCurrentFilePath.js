const { getProjectDirOption } = require('./getProjectDirOption');
const { parseOption } = require('./parseOption');

const getCurrentFilePath = (context) => {
  const currentFilePath = context.getFilename().replaceAll('\\', '/');

  const projectDir = getProjectDirOption(context);
  const insideProjectOnly = parseOption(context.options, 'insideProjectOnly');

  const projectDirPath = `/${projectDir}/`;

  if (insideProjectOnly) {
    const isInsideProject = currentFilePath.includes(projectDirPath);

    if (!isInsideProject) {
      return '';
    }
  }

  const importParts = currentFilePath.split(projectDirPath);

  const fromPath = importParts[importParts.length - 1] || '';

  return fromPath;
};

module.exports = {
  getCurrentFilePath,
};
