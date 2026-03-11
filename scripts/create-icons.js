const fs = require('fs');
const path = require('path');

// Create simple PNG data URLs for icons
const createPNGDataURL = (size) => {
  // This is a minimal 1x1 black PNG
  const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  return Buffer.from(base64, 'base64');
};

const publicDir = path.join(__dirname, '..', 'public');

// Create placeholder images
fs.writeFileSync(path.join(publicDir, 'logo192.png'), createPNGDataURL(192));
fs.writeFileSync(path.join(publicDir, 'logo512.png'), createPNGDataURL(512));
fs.writeFileSync(path.join(publicDir, 'placeholder.png'), createPNGDataURL(1));

console.log('✓ Icon files created successfully');
