const copyFiles = require('./utils/copy-files');
const checkFiles = require('./utils/check-files');
const { watch, watchAll } = require('./utils/watch-files');
const shareMap = require('./sharing-map');

// Get command line arguments
const args = process.argv.slice(2);

// Ensure an asset target is provided
if (args.length === 0) {
  console.error('Please provide a target to copy from');
  console.info('Usage: npm run share <target> [--watch]');
  process.exit(1);
}

// Get the asset target
const assetTarget = args[0];

const target = assetTarget === 'all' ? 'all' : shareMap[assetTarget];

// Ensure the asset target is valid
if (!target && target !== 'all') {
  console.error('❌ Invalid target');
  process.exit(1);
}

// Get watch flag if provided
const watchFlag = args[1] === '--watch';

// If watch flag is provided, watch for changes
if (watchFlag) {
  if (target === 'all') {
    watchAll();
  } else {
    watch(assetTarget);
  }
  return;
}

// ➡️ Check if anything inside source folder differs from destination folder

// ️️If not, do nothing
if (target !== 'all' && !checkFiles(target.sourceFolder, target.destinationFolder)) {
  console.info('👌 No changes detected');
  process.exit(0);
}

// If so, copy files

// If target is "all", copy files for all targets
if (target === 'all') {
  for (const target in shareMap) {
    const { sourceFolder, destinationFolder } = shareMap[target];
    if (!sourceFolder || !destinationFolder) continue;
    if (!checkFiles(sourceFolder, destinationFolder)) {
      console.info('👌 No changes detected in target', target);
      continue;
    }
    copyFiles(sourceFolder, destinationFolder);
  }

  return;
}

// Otherwise, copy files for the specified target
console.info(`📝 Copying files from ${target.sourceFolder} to ${target.destinationFolder}`);
copyFiles(target.sourceFolder, target.destinationFolder);
