const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(/(?<!["=])\{\{CLINIC_NAME\}\}(?!")/g, '{"{{CLINIC_NAME}}"}');
  content = content.replace(/(?<!["=])\{\{PHONE\}\}(?!")/g, '{"{{PHONE}}"}');
  content = content.replace(/(?<!["=])\{\{ADDRESS\}\}(?!")/g, '{"{{ADDRESS}}"}');
  
  fs.writeFileSync(file, content, 'utf8');
});
console.log('Fixed JSX tokens.');
