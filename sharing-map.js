const path = require('path');

const sourcePathPrefix = '../../packages/shared/src/types';

const destinationPathPrefix = '../../packages';

// Use to define sources and destinations for sharing types, models, components, etc.
const shareMap = {
  'store-client': {
    sourceFolder: path.join(__dirname, sourcePathPrefix, 'store'),
    destinationFolder: path.join(__dirname, destinationPathPrefix, 'store-client/src/@shared'),
  },
  'store-api': {
    sourceFolder: path.join(__dirname, sourcePathPrefix, 'store'),
    destinationFolder: path.join(__dirname, destinationPathPrefix, 'store-api/src/@shared'),
  },
  'backoffice-client': {
    sourceFolder: path.join(__dirname, sourcePathPrefix, 'backoffice'),
    destinationFolder: path.join(__dirname, destinationPathPrefix, 'backoffice-client/src/@shared'),
  },
  'backoffice-api': {
    sourceFolder: path.join(__dirname, sourcePathPrefix, 'backoffice'),
    destinationFolder: path.join(__dirname, destinationPathPrefix, 'backoffice-api/src/@shared'),
  },
};

module.exports = shareMap;
