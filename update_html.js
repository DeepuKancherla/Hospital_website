const fs = require('fs');
let html = fs.readFileSync('HOSP.html', 'utf8');

// 1. Link Patient Portal
html = html.replace('<a href="#">Patient Portal</a>', '<a href="portal.html">Patient Portal</a>');

// 2. Clear dept-grid
const deptRegex = /(<div class="dept-grid" id="deptGrid">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/;
html = html.replace(deptRegex, '$1\n    <!-- Dynamic Content -->\n  </div>\n  </div>\n</section>');

// 3. Clear doctors-grid
const docRegex = /(<div class="doctors-grid" id="doctorsGrid">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/;
html = html.replace(docRegex, '$1\n    <!-- Dynamic Content -->\n  </div>\n  </div>\n</section>');

// 4. Clear packages-grid
const pkgRegex = /(<div class="packages-grid">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/;
html = html.replace(pkgRegex, '$1\n    <!-- Dynamic Content -->\n  </div>\n  </div>\n</section>');

// 5. Clear stories-grid
const storyRegex = /(<div class="stories-grid">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/;
html = html.replace(storyRegex, '$1\n    <!-- Dynamic Content -->\n  </div>\n  </div>\n</section>');

fs.writeFileSync('HOSP.html', html);
console.log('HTML updated successfully');
