const fs = require('fs');
const https = require('https');
const path = require('path');

const imageMap = {
    'modern-bedroom.jpg': 'photo-1522708323590-d24dbb6b0267',
    'commercial-space.jpg': 'photo-1497215848143-69e46a788bb2',
    'site-execution.jpg': 'photo-1504307651254-35680f35aa9e'
};

const dir = path.join(__dirname, 'assets');

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 302 || res.statusCode === 301) {
                downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
            } else if (res.statusCode !== 200) {
                reject(new Error(`Failed with status code: ${res.statusCode}`));
            } else {
                const file = fs.createWriteStream(filepath);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            }
        }).on('error', reject);
    });
}

(async () => {
    for (const [filename, id] of Object.entries(imageMap)) {
        const url = `https://images.unsplash.com/${id}?w=1200&q=80&fit=crop`;
        console.log(`Downloading ${filename}...`);
        try {
            await downloadImage(url, path.join(dir, filename));
            console.log(`Successfully downloaded ${filename}`);
        } catch (e) {
            console.error(`Failed to download ${filename}:`, e);
        }
    }
    console.log("All done!");
})();
