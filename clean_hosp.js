const fs = require('fs');

let html = fs.readFileSync('HOSP.html', 'utf8');

// 1. Extract CSS
const styleRegex = /<style>([\s\S]*?)<\/style>/i;
const styleMatch = html.match(styleRegex);
if (styleMatch) {
    if (!fs.existsSync('css')) fs.mkdirSync('css');
    fs.writeFileSync('css/style.css', styleMatch[1]);
    html = html.replace(styleRegex, '<link rel="stylesheet" href="css/style.css">');
    console.log('CSS extracted to css/style.css');
}

// 2. Remove inline script and replace with links
const scriptRegex = /<script>([\s\S]*?)<\/script>/i;
html = html.replace(scriptRegex, '<script src="js/data.js"></script>\n<script src="js/main.js"></script>');
console.log('Inline script replaced with external links');

// 3. Clear grids
const deptRegex = /(<div class="dept-grid"[^>]*>)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/i;
html = html.replace(deptRegex, '$1\n      <!-- Dynamic Content loaded from JS -->\n    </div>\n  </div>\n</section>');

const docRegex = /(<div class="doctors-grid"[^>]*>)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/i;
html = html.replace(docRegex, '$1\n      <!-- Dynamic Content loaded from JS -->\n    </div>\n  </div>\n</section>');

const pkgRegex = /(<div class="packages-grid">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/i;
html = html.replace(pkgRegex, '$1\n      <!-- Dynamic Content loaded from JS -->\n    </div>\n  </div>\n</section>');

const storyRegex = /(<div class="stories-grid">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/i;
html = html.replace(storyRegex, '$1\n      <!-- Dynamic Content loaded from JS -->\n    </div>\n  </div>\n</section>');
console.log('Grids cleared for dynamic loading');

// 4. Patient portal link
html = html.replace('<a href="#">Patient Portal</a>', '<a href="portal.html">Patient Portal</a>');
console.log('Portal link updated');

// 5. Add Maps Iframe
const contactRegex = /(<span>OPD: Mon–Sat 8am–8pm<br\/>Emergency: 24\/7 · 365 Days<\/span>\s*<\/div>)/i;
html = html.replace(contactRegex, '$1\n      <div style="margin-top:1rem; border-radius:12px; overflow:hidden;">\n        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121825.2635315809!2d78.36141315998656!3d17.41165147575306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1716104113256!5m2!1sen!2sin" width="100%" height="150" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>\n      </div>');
console.log('Map iframe added');

fs.writeFileSync('HOSP.html', html);
console.log('HOSP.html successfully rewritten');
