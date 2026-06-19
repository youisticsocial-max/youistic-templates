const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

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

const files = walk(dir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace {{TOKEN}} outside quotes
    // We can do this by splitting the content by '"' or '\''.
    // A much safer way for our specific files is to regex match things like:
    // >{{TOKEN}}< -> >{"{{TOKEN}}"}<
    // > text {{TOKEN}} < -> > text {"{{TOKEN}}"} <
    // Let's use a regex that matches {{[A-Z_]+}} NOT preceded by =\" or ="
    
    // Actually, in JSX, {{ADDRESS}} will be parsed as an expression containing an object.
    // So {{ADDRESS}} -> {"{{ADDRESS}}"}
    // But if it's alt="{{CLINIC_NAME}}", it's already a string!
    // So we only want to replace {{TOKEN}} where it's NOT inside quotes.
    // A simple regex: /(?<!["'`])\{\{([A-Z_]+)\}\}(?!["'`])/g
    // Node.js supports lookbehind.
    
    const newContent = content.replace(/(?<!["'`])\{\{([A-Z_]+)\}\}(?!["'`])/g, '{"{{$1}}"}');
    
    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated ${file}`);
    }
});
