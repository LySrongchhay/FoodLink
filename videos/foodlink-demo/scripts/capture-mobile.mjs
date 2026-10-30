import puppeteer from 'file:///C:/nvm4w/nodejs/node_modules/hyperframes/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const outDir = './assets/mobile-screenshots';
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

async function run() {
  console.log('Launching Chrome for comprehensive mobile capture...');
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

  // 1. Merchant App Captures
  console.log('--- Capturing Merchant Mobile Screens ---');
  try {
    await page.goto('https://foodlink-merchants.vercel.app', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: join(outDir, 'merchant-dashboard.png') });
    console.log('✓ merchant-dashboard.png');

    // Click "+ Create New Bag" button
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Create New Bag')) {
        console.log('Found Create New Bag button, clicking...');
        await btn.click();
        await new Promise(r => setTimeout(r, 1500));
        await page.screenshot({ path: join(outDir, 'merchant-create-listing.png') });
        console.log('✓ merchant-create-listing.png');
        break;
      }
    }

    // Reload merchant to click "Scan Pickup Code" or "Verify"
    await page.goto('https://foodlink-merchants.vercel.app', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));
    const buttons2 = await page.$$('button');
    for (const btn of buttons2) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Scan Pickup Code')) {
        console.log('Found Scan Pickup Code button, clicking...');
        await btn.click();
        await new Promise(r => setTimeout(r, 1500));
        await page.screenshot({ path: join(outDir, 'merchant-verify-code.png') });
        console.log('✓ merchant-verify-code.png');
        break;
      }
    }

    // Click "Orders" bottom tab
    const tabs = await page.$$('button, nav div, nav button');
    for (const tab of tabs) {
      const text = await page.evaluate(el => el.textContent, tab);
      if (text.trim() === 'Orders') {
        console.log('Found Orders tab, clicking...');
        await tab.click();
        await new Promise(r => setTimeout(r, 1500));
        await page.screenshot({ path: join(outDir, 'merchant-orders-queue.png') });
        console.log('✓ merchant-orders-queue.png');
        break;
      }
    }
  } catch (err) {
    console.error('Merchant capture error:', err.message);
  }

  // 2. Customer App Captures
  console.log('--- Capturing Customer Mobile Screens ---');
  try {
    await page.goto('https://foodlink-beige.vercel.app', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));

    // Click "Clear Search & Reset" if present, or click "Explore" tab
    const navButtons = await page.$$('button');
    for (const btn of navButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Clear Search') || text.includes('Explore')) {
        await btn.click();
        await new Promise(r => setTimeout(r, 1500));
        break;
      }
    }

    await page.screenshot({ path: join(outDir, 'customer-feed.png') });
    console.log('✓ customer-feed.png');

    // Click Explore bottom tab
    const bottomTabs = await page.$$('button, nav a, div[class*="flex-col"]');
    for (const tab of bottomTabs) {
      const text = await page.evaluate(el => el.textContent, tab);
      if (text.includes('Explore')) {
        await tab.click();
        await new Promise(r => setTimeout(r, 1500));
        await page.screenshot({ path: join(outDir, 'customer-explore.png') });
        console.log('✓ customer-explore.png');
        break;
      }
    }

    // Click Reserved tab to show pickup screen
    for (const tab of bottomTabs) {
      const text = await page.evaluate(el => el.textContent, tab);
      if (text.includes('Reserved')) {
        await tab.click();
        await new Promise(r => setTimeout(r, 1500));
        await page.screenshot({ path: join(outDir, 'customer-reserved-pickup.png') });
        console.log('✓ customer-reserved-pickup.png');
        break;
      }
    }
  } catch (err) {
    console.error('Customer capture error:', err.message);
  }

  await browser.close();
  console.log('All mobile screenshots captured successfully!');
}

run();
