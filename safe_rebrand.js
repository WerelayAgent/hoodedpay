const fs = require('fs');
const path = require('path');

function processFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fp = path.join(dir, file);
        if (fs.statSync(fp).isDirectory()) {
            if (file !== '.git' && file !== 'node_modules') {
                processFiles(fp);
            }
        } else if (fp.endsWith('.js') || fp.endsWith('.html') || fp.endsWith('.css')) {
            let content = fs.readFileSync(fp, 'utf8');
            let original = content;
            
            // Protect window.solana
            content = content.replace(/window\.robinhoodchain/g, 'window.solana');
            
            // Rebrand Pons Family -> Pons Family
            content = content.replace(/\bpump\.fun\b/gi, 'Pons Family');
            content = content.replace(/pump\.fun/gi, 'Pons Family');
            content = content.replace(/\bPons Family\b/gi, 'Pons Family');
            content = content.replace(/Pons Family/gi, 'Pons Family');
            // Fix URLs to ponsfamily.com
            content = content.replace(/https?:\/\/(www\.)?Pons Family/gi, 'https://ponsfamily.com');

            // Rebrand Robinhood Chain -> Robinhood Chain
            content = content.replace(/\bSolana\b/g, 'Robinhood Chain');
            content = content.replace(/\bsolana\b/g, 'robinhoodchain');
            
            // Restore window.solana
            content = content.replace(/window.solana/g, 'window.solana');
            
            if (content !== original) {
                fs.writeFileSync(fp, content);
                console.log('Fixed', fp);
            }
        }
    }
}
processFiles('.');
console.log('Done.');
