const options = {
  urls: [
    'https://www.hoodedpay.com/',
    'https://www.hoodedpay.com/login',
    'https://www.hoodedpay.com/signup'
  ],
  directory: './site',
  recursive: true,
  maxDepth: 1,
  filenameGenerator: 'bySiteStructure'
};

async function run() {
  console.log('Starting scraping...');
  const scrape = (await import('website-scraper')).default;
  try {
    await scrape(options);
    console.log("Scraping completed successfully");
  } catch (err) {
    console.error("Error occurred while scraping", err);
  }
}
run();
