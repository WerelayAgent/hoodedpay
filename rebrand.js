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

            const replacements = [
                { pattern: /HoodedPay/g, replacement: 'HoodedPay' },
                { pattern: /hooded\.cash/gi, replacement: 'hoodedpay.com' },
                { pattern: /Pons Family/gi, replacement: 'Pons Family' },
                { pattern: /coming soon on Pons Family/gi, replacement: 'coming soon on Pons Family' },
                { pattern: /x\.com\/hoodedcash/gi, replacement: 'x.com/hoodedpay' },
                { pattern: /@hoodedpay/gi, replacement: '@hoodedpay' }
            ];

            for (const { pattern, replacement } of replacements) {
                if (pattern.test(content)) {
                    content = content.replace(pattern, replacement);
                    modified = true;
                }
            }

            // Remove Next.js script tags to avoid hydration errors causing 404s
            if (file.endsWith('.html')) {
                if (content.includes('<script src="/_next/')) {
                    content = content.replace(/<script src="\/_next\/.*?<\/script>/g, '');
                    modified = true;
                }
                if (content.includes('__next_error__') || content.includes('_next/static')) {
                    // Let's ensure we strip all nextjs chunks
                    content = content.replace(/<script[^>]*src="\/_next\/static[^>]*><\/script>/g, '');
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(filePath, content);
                console.log(`Updated ${filePath}`);
            }
        }
    }
}

processFiles(dir);
console.log('Rebranding complete.');
