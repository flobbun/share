const fs = require('fs');

const ignoreFiles = ['.DS_Store', '.gitkeep', '.gitignore'];

const copyFiles = (sourceFolder, destinationFolder) => {
  // Ensure target directory exists
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
  }

  // Copy files
  fs.cpSync(sourceFolder, destinationFolder, { recursive: true, filter: (src) => !ignoreFiles.includes(src) });
};

module.exports = copyFiles;
