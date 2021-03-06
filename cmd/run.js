const fs = require('fs');
const pLimit = require('p-limit');
const puppeteer = require('puppeteer');
const sitemaps = require('sitemap-stream-parser');
const { DateTime } = require('luxon');
const { urlToFilename, urlToDomain } = require('../lib/url');

module.exports = (commandArgs) => {
  // Default arguments
  const defaultArgs = {
    url: false, // URL to sitemap.xml file
    vw: 1366, // Browser viewport width
    vh: 768, // Browser viewport height
    dir: './', // Output directory for saved files
    timeout: 60000, // 60 seconds
    format: 'pdf', // Image format
    heightBuffer: 0, // Buffer page height
    delay: 0, // Delay before screenshot
    waitUntil: 'networkidle2', // How many network connections to wait for
    preset: null, // Optional preset url
    limit: 20, // Limit concurrency batches
  };

  // Allow ingesting a preset .json file
  let presetArgs = {};
  const presetFile = commandArgs.preset || null;
  if (presetFile && fs.existsSync(presetFile)) {
    const presetData = fs.readFileSync(presetFile);
    presetArgs = presetData ? JSON.parse(presetData) : {};
  }

  // Combine arguments
  const args = { ...defaultArgs, ...commandArgs, ...presetArgs };

  // Set max event listeners based on batch size limits
  process.setMaxListeners(args.limit);

  // Holders
  const allUrls = [];
  const concurrencyLimit = pLimit(args.limit);
  const sitemapUrl = args.url;
  const folderTime = DateTime.local().toFormat('yyyyMMdd@hhmmss');
  const storageDir = `${args.dir}/${urlToDomain(sitemapUrl)}_${folderTime}`;

  // Ensure we have a url
  if (!sitemapUrl) {
    console.warn('🛑 No --url argument specified.');
    return;
  }

  // Go get the sitemap
  sitemaps.parseSitemaps([sitemapUrl], (url) => {
    allUrls.push(url);
  }, async () => {
    console.log(`🎬 ${allUrls.length} urls scraped from sitemap. Starting capture...`);
    console.log(`📂 creating output directory "${storageDir}`);
    createDirectory();

    await Promise.all(allUrls.map(url => concurrencyLimit(() => screenshot(url))))
      .then((res) => {
        console.log(`Done. Processed ${res.length} urls.`);
      });
  });

  async function screenshot(url) {
    const niceName = urlToFilename(url);
    const outputPath = `${storageDir}/${niceName}`;

    // Let's capture the screen grab
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      // No to the url
      const result = await page.goto(url, {
        waitUntil: args.waitUntil,
        timeout: args.timeout,
      });

      // Set the page size
      await page.setViewport({
        width: args.vw,
        height: args.vh,
      });

      // Optional delay time
      await page.waitFor(args.delay);

      // Handle 404 and other
      if (result.status() !== 200) {
        console.error(`⚠️ could not get ${url}`);
        await browser.close();
        return;
      }
    } catch (err) {
      console.log(`⚠️ error loading ${url}`);
      await browser.close();
      return;
    }

    try {
      if (args.format === 'pdf') {
        // Get the height of the page to set the PDF height
        const height = await page.evaluate(
          // eslint-disable-next-line no-undef
          () => document.documentElement.offsetHeight,
        );

        await page.pdf({
          path: `${outputPath}.pdf`,
          height: `${height + args.heightBuffer}px`,
          printBackground: true,
        });
      } else {
        await page.screenshot({
          path: `${outputPath}.${args.format}`,
          type: args.format,
          fullPage: true,
        });
      }
    } catch (err) {
      console.log(`❓Unknown error generating screenshot for ${url}`);
      await browser.close();
      return;
    }

    console.log(`✅ successfully captured ${url}`);

    await browser.close();
  }

  function createDirectory() {
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir);
    }
  }
};
