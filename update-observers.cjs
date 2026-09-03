const fs = require('fs');
const path = require('path');

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
    let newContent = content.replace(
        /if\s*\(\s*e\.isIntersecting\s*\)\s*e\.target\.querySelectorAll\(\s*"\.fade-in-up"\s*\)\.forEach\(\s*el\s*=>\s*el\.classList\.add\(\s*"visible"\s*\)\s*\);/g,
        `if (e.isIntersecting) {
                    e.target.querySelectorAll(".fade-in-up").forEach(el => el.classList.add("visible"));
                } else {
                    e.target.querySelectorAll(".fade-in-up").forEach(el => el.classList.remove("visible"));
                }`
    );
    if (content !== newContent) {
        fs.writeFileSync(f, newContent);
        console.log('Updated ' + f);
    }
});
