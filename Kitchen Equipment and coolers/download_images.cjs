const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = [
  { url: "https://picsum.photos/seed/industrial1/1600/900", dest: "public/assets/hero-machine.jpg" },
  { url: "https://picsum.photos/seed/industrial2/800/600", dest: "public/assets/machine-1.jpg" },
  { url: "https://picsum.photos/seed/industrial3/800/600", dest: "public/assets/machine-2.jpg" },
  { url: "https://picsum.photos/seed/industrial4/800/600", dest: "public/assets/machine-3.jpg" },
  { url: "https://picsum.photos/seed/industrial5/1600/900", dest: "public/assets/factory.jpg" },
  { url: "https://picsum.photos/seed/industrial6/1600/900", dest: "public/assets/manufacturing.jpg" },
  { url: "https://picsum.photos/seed/industrial7/1600/900", dest: "public/assets/quality-testing.jpg" },
  { url: "https://picsum.photos/seed/industrial8/800/600", dest: "public/assets/engineer.jpg" },
  { url: "https://picsum.photos/seed/industrial9/1600/900", dest: "public/assets/industrial-process.jpg" },
  { url: "https://picsum.photos/seed/industrial10/800/600", dest: "public/assets/product-detail.jpg" },
  { url: "https://ui-avatars.com/api/?name=ME&background=0a0a0c&color=f0f0f2&size=400&font-size=0.33&bold=true&format=png", dest: "public/assets/logo.png" }
];

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of downloads) {
    try {
      await downloadFile(item.url, path.join(__dirname, item.dest));
      console.log('Downloaded', item.dest);
    } catch (e) {
      console.error('Failed to download', item.dest, e);
    }
  }
}

run();
