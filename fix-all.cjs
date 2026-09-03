const fs = require('fs');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('./src');
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Specifically target the bad syntax
    let newContent = content.replace(
        /classList\.remove\("visible"\)\);\s*\}\}/g,
        'classList.remove("visible"));\n                    }'
    );
    
    if (content !== newContent) {
        fs.writeFileSync(f, newContent);
        console.log('Fixed observer block in ' + f);
    }
});
