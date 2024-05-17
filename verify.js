const checkFiles = require('./utils/check-files');
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

// Ensure the asset target is valid
if (!shareMap[assetTarget] && assetTarget !== 'all') {
  console.error('❌ Invalid target');
  process.exit(1);
}

// If the target is 'all', verify all assets
if (assetTarget === 'all') {
  const differences = [];

  for (const target in shareMap) {
    const { sourceFolder, destinationFolder } = shareMap[target];

    if (checkFiles(sourceFolder, destinationFolder)) {
      differences.push(target);
    }
  }

  if (differences.length === 0) {
    console.info('👌 No differences detected');
    process.exit(0);
  }

  console.error('❌ Differences detected in the following targets:');
  differences.forEach((target) => console.error(`- ${target}`));
  process.exit(1);
}

const { sourceFolder, destinationFolder } = shareMap[assetTarget];

if (!checkFiles(sourceFolder, destinationFolder)) {
  console.info('👌 No differences detected');
  process.exit(0);
}

console.error('❌ Differences detected');
process.exit(1);
