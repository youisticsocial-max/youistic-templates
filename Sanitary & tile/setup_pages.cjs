const fs = require('fs');
const path = require('path');

const dirs = ['src/components', 'src/pages'];
dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

const pages = [
  'Home', 'About', 'TileCollections', 'BathwareCollections',
  'Spaces', 'WhyChooseUs', 'Projects', 'Designers',
  'Downloads', 'News', 'Contact'
];

pages.forEach(p => {
  const file = path.join('src/pages', `${p}.jsx`);
  fs.writeFileSync(file, `export default function ${p}() { return <div className="section container"><h1>${p}</h1></div>; }`);
});

const components = ['Navbar', 'Footer'];
components.forEach(c => {
  const file = path.join('src/components', `${c}.jsx`);
  fs.writeFileSync(file, `export default function ${c}() { return <div className="${c.toLowerCase()}">${c}</div>; }`);
});

console.log('Pages and components created.');
