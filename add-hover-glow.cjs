const fs = require('fs');

const classesToEnhance = [
    'wcu-card', 
    'benefit-card', 
    'test-card', 
    'calc-kpi-card', 
    'blog-card'
];

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
    let original = content;
    
    classesToEnhance.forEach(cls => {
        // e.g. className="wcu-card fade-in-up" -> className="wcu-card fade-in-up hover-glow"
        // Also handle template literals: className={`wcu-card fade-in-up delay-${i}`}
        
        // Match className="... cls ..." or className={`... cls ...`}
        // This regex is a bit complex, but let's try a simpler string replacement for known patterns
        
        const r1 = new RegExp('className="([^"]*' + cls + '[^"]*)"', 'g');
        content = content.replace(r1, (match, p1) => {
            if (!p1.includes('hover-glow')) {
                return `className="${p1} hover-glow"`;
            }
            return match;
        });

        const r2 = new RegExp('className=\\{\`([^\`]*' + cls + '[^\`]*)\`\\}', 'g');
        content = content.replace(r2, (match, p1) => {
            if (!p1.includes('hover-glow')) {
                return `className={\`${p1} hover-glow\`}`;
            }
            return match;
        });
    });

    if (content !== original) {
        fs.writeFileSync(f, content);
        console.log('Added hover-glow to ' + f);
    }
});
