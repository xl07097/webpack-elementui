const path = require('path');
const dist = './dist';

module.exports = {
  directoryIndex: dist,
  // globPatterns: ['**/*.{html,js,css}'],
  swDest: path.join(dist, 'sw.js'),
  clientsClaim: true,
  skipWaiting: true,
};