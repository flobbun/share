const fs = require('fs');
const path = require('path');

const ignoreFiles = ['.DS_Store', '.gitkeep', '.gitignore'];

const checkFiles = (sourceFolder, destinationFolder) => {
  let sourceFiles = fs.readdirSync(sourceFolder);
  let destinationFiles = fs.readdirSync(destinationFolder);

  // Remove ignored files
  sourceFiles = sourceFiles.filter((file) => !ignoreFiles.includes(file));
  destinationFiles = sourceFiles.filter((file) => !ignoreFiles.includes(file));

  if (sourceFiles.length !== destinationFiles.length) {
    return true;
  }

  for (let i = 0; i < sourceFiles.length; i++) {
    const sourceFilePath = path.join(sourceFolder, sourceFiles[i]);
    const destinationFilePath = path.join(destinationFolder, destinationFiles[i]);

    if (fs.lstatSync(sourceFilePath).isDirectory()) {
      if (!fs.existsSync(destinationFilePath)) {
        return true;
      }

      if (checkFiles(sourceFilePath, destinationFilePath)) {
        return true;
      }
    } else {
      if (
        !fs.existsSync(destinationFilePath) ||
        fs.readFileSync(sourceFilePath).toString() !== fs.readFileSync(destinationFilePath).toString()
      ) {
        return true;
      }
    }
  }

  return false;
};

module.exports = checkFiles;
