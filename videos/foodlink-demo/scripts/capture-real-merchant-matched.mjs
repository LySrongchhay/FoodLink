import puppeteer from 'file:///C:/nvm4w/nodejs/node_modules/hyperframes/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import { join } from 'node:path';

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const outDir = 'd:/DGIY/foodlink-1/videos/foodlink-demo/assets';

async function run() {
  console.log('Launching browser to capture authentic Merchant matched screen...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=390,844']
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('request', req => console.log('REQ:', req.url()));
  page.on('response', res => console.log('RES:', res.url(), res.status()));

  console.log('Navigating to https://foodlink-merchants.vercel.app...');
  await page.goto('https://foodlink-merchants.vercel.app', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 2000));

  // Find and click the Verify button
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Scan Pickup Code') || text.includes('Verify')) {
      await b.click();
      console.log('Clicked Verify Pickup button!');
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2000));

  // Trigger input change via React's native setter
  console.log('Setting input value 249726 via React setter...');
  await page.evaluate(() => {
    const input = document.querySelector('input');
    if (input) {
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeSetter.call(input, '249726');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  console.log('Waiting for lookup request and response...');
  await new Promise(r => setTimeout(r, 4000));

  const pageText = await page.evaluate(() => document.body.textContent);
  console.log('Page has "Code Matched"?', pageText.includes('Code Matched'));
  console.log('Page has "Confirm & Complete Handover"?', pageText.includes('Confirm & Complete Handover'));

  const targetPath = join(outDir, 'mob-merchant-verify-matched-real.png');
  await page.screenshot({ path: targetPath });
  console.log('✓ Successfully saved authentic matched screen to:', targetPath);

  await browser.close();
}

run().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
