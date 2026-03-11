const fs = require('fs');
const path = require('path');

// Create simple SVG icons
const createSVG = (size) => `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#000000"/>
  <text x="50%" y="50%" font-size="${size/4}" fill="#FFFFFF" text-anchor="middle" dy=".3em">News</text>
</svg>`;

const publicDir = path.join(__dirname, '..', 'public');

// Write SVG files
fs.writeFileSync(path.join(publicDir, 'logo192.svg'), createSVG(192));
fs.writeFileSync(path.join(publicDir, 'logo512.svg'), createSVG(512));

console.log('Icons generated successfully');
