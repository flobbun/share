const fs = require('fs');
const shareMap = require('../sharing-map');
const checkFiles = require('./check-files');
const copyFiles = require('./copy-files');

const watch = (target) => {
  console.info(`🔍 Watching ${target}`);
  const { sourceFolder, destinationFolder } = shareMap[target];
  fs.watch(sourceFolder, { recursive: true }, (eventType, filename) => {
    console.info(`🔍 Detected ${eventType} in ${filename}`);
    if (checkFiles(sourceFolder, destinationFolder)) {
      console.info('📝 Copying files');
      copyFiles(sourceFolder, destinationFolder);
    } else {
      console.info('👌 No changes detected');
    }
  });
};

const watchAll = () => {
  console.info('🔍 Watching all targets');
  for (const target in shareMap) {
    watch(target);
  }
};

module.exports = {
  watch,
  watchAll,
};
