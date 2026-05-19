const fs = require('fs');
const path = require('path');

let content = fs.readFileSync('HOSP.html', 'utf8');

const styleStart = content.indexOf('<style>');
const styleEnd = content.indexOf('</style>');
if (styleStart !== -1 && styleEnd !== -1) {
    const css = content.slice(styleStart + 7, styleEnd).trim();
    if (!fs.existsSync('css')) fs.mkdirSync('css');
    fs.writeFileSync(path.join('css', 'style.css'), css, 'utf8');
    content = content.slice(0, styleStart) + '<link rel="stylesheet" href="css/style.css">\n' + content.slice(styleEnd + 8);
}

const scriptStart = content.indexOf('<script>');
const scriptEnd = content.indexOf('</script>');
if (scriptStart !== -1 && scriptEnd !== -1) {
    const js = content.slice(scriptStart + 8, scriptEnd).trim();
    if (!fs.existsSync('js')) fs.mkdirSync('js');
    fs.writeFileSync(path.join('js', 'main.js'), js, 'utf8');
    content = content.slice(0, scriptStart) + '<script src="js/data.js"></script>\n<script src="js/main.js"></script>\n' + content.slice(scriptEnd + 9);
}

fs.writeFileSync('HOSP.html', content, 'utf8');
console.log('Extraction complete');
