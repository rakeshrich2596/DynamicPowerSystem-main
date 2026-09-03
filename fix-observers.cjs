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
    
    // First, find the starting point of the if block
    const fixedContent = content.replace(
        /if\s*\(\s*e\.isIntersecting\s*\)\s*\{[\s\S]*?(?=\}\s*\}\)|\}\s*\}\,)/g,
        `if (e.isIntersecting) {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.add("visible"));
                    } else {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.remove("visible"));
                    }`
    );
    
    if (content !== fixedContent) {
        fs.writeFileSync(f, fixedContent);
        console.log('Fixed ' + f);
    }
});
