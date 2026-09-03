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
    let newContent = content.replace(
        /if\s*\(\s*e\.isIntersecting\s*\)\s*\{\s*e\.target\.querySelectorAll\(\"\.fade-in-up,\s*\.fade-in-left,\s*\.fade-in-right,\s*\.scale-up\"\)\.forEach\(el\s*=>\s*el\.classList\.add\(\"visible\"\)\);\s*\}/g,
        `if (e.isIntersecting) {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.add("visible"));
                    } else {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.remove("visible"));
                    }`
    );
    // Also handle cases where the else block is missing but we have e.isIntersecting
    newContent = newContent.replace(
        /if\s*\(\s*e\.isIntersecting\s*\)\s*\{\s*e\.target\.querySelectorAll\(\s*\"\.\S+.*\"\s*\)\.forEach\(\s*el\s*=>\s*el\.classList\.add\(\s*\"visible\"\s*\)\s*\);\s*\}\s*(?!else)/g,
        `if (e.isIntersecting) {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.add("visible"));
                    } else {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.remove("visible"));
                    }`
    );
    if (content !== newContent) {
        fs.writeFileSync(f, newContent);
        console.log('Fixed observer blocks in ' + f);
    }
});
