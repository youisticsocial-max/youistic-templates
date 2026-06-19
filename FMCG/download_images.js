import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, 'src', 'assets');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const images = {
  'hero-fmcg.jpg': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1600&auto=format&fit=crop',
  'spices.jpg': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop',
  'dry-fruits.jpg': 'https://images.unsplash.com/photo-1582585434551-37731f28b49e?q=80&w=800&auto=format&fit=crop',
  'pulses.jpg': 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?q=80&w=800&auto=format&fit=crop',
  'flour.jpg': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
  'tea-coffee.jpg': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
  'oil-ghee.jpg': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800&auto=format&fit=crop',
  'snacks.jpg': 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=800&auto=format&fit=crop',
  'organic-products.jpg': 'https://images.unsplash.com/photo-1600856209923-34372864efb6?q=80&w=800&auto=format&fit=crop',
  'factory.jpg': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
  'farming.jpg': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop',
  'packaging.jpg': 'https://images.unsplash.com/photo-1621831828859-99a38ab82d77?q=80&w=800&auto=format&fit=crop',
};

async function downloadImages() {
  for (const [filename, url] of Object.entries(images)) {
    const dest = path.join(assetsDir, filename);
    console.log(`Downloading ${filename}...`);
    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
      });
      const writer = fs.createWriteStream(dest);
      response.data.pipe(writer);
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
      console.log(`Saved ${filename}`);
    } catch (e) {
      console.error(`Error downloading ${filename}: ${e.message}`);
    }
  }
}

downloadImages();
