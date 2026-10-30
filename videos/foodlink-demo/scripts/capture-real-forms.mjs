import puppeteer from 'file:///C:/nvm4w/nodejs/node_modules/hyperframes/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const outDir = './assets';

async function run() {
  console.log('Launching Chrome to capture real Create Listing & In-App Notification popups...');
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

  // 1. Capture Merchant Create Listing Form
  console.log('Navigating to merchant app...');
  await page.goto('https://foodlink-merchants.vercel.app', { waitUntil: 'networkidle2', timeout: 35000 });
  await new Promise(r => setTimeout(r, 1500));

  // Find and click "Listings" tab or "+ Create New Bag"
  console.log('Attempting to open Create Listing form...');
  const buttons = await page.$$('button');
  let clicked = false;
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Create New Bag')) {
      await btn.click();
      clicked = true;
      break;
    }
  }

  if (!clicked) {
    // try finding Listings tab
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.trim() === 'Listings') {
        await btn.click();
        await new Promise(r => setTimeout(r, 1000));
        const addBtns = await page.$$('button');
        for (const ab of addBtns) {
          const abText = await page.evaluate(el => el.textContent, ab);
          if (abText.includes('Add Bag') || abText.includes('Create')) {
            await ab.click();
            clicked = true;
            break;
          }
        }
        break;
      }
    }
  }

  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: join(outDir, 'mob-merchant-create-form.png') });
  console.log('✓ mob-merchant-create-form.png saved');

  // Also capture scrolled view of create form (preset or pricing)
  await page.evaluate(() => window.scrollBy(0, 300));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: join(outDir, 'mob-merchant-create-details.png') });
  console.log('✓ mob-merchant-create-details.png saved');

  // 2. Capture Customer App with Notification Alert
  console.log('Navigating to customer app...');
  await page.goto('https://foodlink-beige.vercel.app', { waitUntil: 'networkidle2', timeout: 35000 });
  await new Promise(r => setTimeout(r, 1500));

  // We can trigger or inject the ListingAlertPopup state or click notifications
  // In the customer app, let's see if we can trigger notification popup or bell
  const bellBtns = await page.$$('button');
  for (const b of bellBtns) {
    const aria = await page.evaluate(el => el.getAttribute('aria-label') || el.textContent, b);
    if (aria.includes('notification') || aria.includes('Notification')) {
      console.log('Clicking notification bell...');
      await b.click();
      await new Promise(r => setTimeout(r, 1200));
      await page.screenshot({ path: join(outDir, 'mob-customer-notification-modal.png') });
      console.log('✓ mob-customer-notification-modal.png saved');
      break;
    }
  }

  await browser.close();
  console.log('Done captures!');
}

run();
