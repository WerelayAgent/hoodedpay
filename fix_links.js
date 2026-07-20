const fs = require('fs');
const path = require('path');

const dir = 'C:\\Tools\\hoodedpay';

function processFiles(directory) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                processFiles(filePath);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            // Fix website-scraper rewritten relative links back to absolute ones
            
            // X / Twitter
            if (content.match(/href="[^"]*x\.com[^"]*"/g)) {
                content = content.replace(/href="[^"]*x\.com[^"]*"/g, 'href="https://x.com/hoodedpay"');
                modified = true;
            }

            // Docs
            if (content.match(/href="[^"]*docs\.hooded[^"]*"/g)) {
                content = content.replace(/href="[^"]*docs\.hooded[^"]*"/g, 'href="https://docs.hoodedpay.com"');
                modified = true;
            }
            
            // Github
            if (content.match(/href="[^"]*github\.com[^"]*"/g)) {
                content = content.replace(/href="[^"]*github\.com[^"]*"/g, 'href="https://github.com/hoodedpay"');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, content);
                console.log(`Fixed links in ${filePath}`);
            }
        }
    }
}

processFiles(dir);
console.log('Links fixed.');
