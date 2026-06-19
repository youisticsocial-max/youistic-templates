const fs = require('fs');
const path = require('path');

const srcHero = 'C:\\Users\\Owner\\.gemini\\antigravity\\brain\\8d4c3f0a-be27-414f-b8a9-6a48f29b1958\\hero_architecture_1781731791134.png';
const srcBath = 'C:\\Users\\Owner\\.gemini\\antigravity\\brain\\8d4c3f0a-be27-414f-b8a9-6a48f29b1958\\luxury_bathroom_1781731806218.png';

const publicAssetsDir = 'public/assets';

if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

// Map the required assets
const filesToCopy = [
  { dest: 'hero-architecture.jpg', src: srcHero },
  { dest: 'luxury-bathroom.jpg', src: srcBath },
  { dest: 'living-room-tile.jpg', src: srcHero },
  { dest: 'tile-texture.jpg', src: srcBath },
  { dest: 'collection-matt.jpg', src: srcBath },
  { dest: 'collection-glossy.jpg', src: srcHero },
  { dest: 'showroom.jpg', src: srcHero },
  { dest: 'architect.jpg', src: srcHero },
  { dest: 'project-gallery.jpg', src: srcBath },
  { dest: 'factory.jpg', src: srcBath }
];

filesToCopy.forEach(file => {
  fs.copyFileSync(file.src, path.join(publicAssetsDir, file.dest));
});

console.log('Assets setup completed.');
