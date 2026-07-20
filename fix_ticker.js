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
        } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.json')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            if (content.includes('$HPAY')) {
                content = content.replace(/\$HPAY/g, '$HPAY');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, content);
                console.log(`Updated ticker in ${filePath}`);
            }
        }
    }
}

processFiles(dir);
console.log('Ticker update complete.');
