import puppeteer from 'file:///C:/nvm4w/nodejs/node_modules/hyperframes/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import { join } from 'node:path';

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const outDir = './assets';

async function run() {
  console.log('Capturing real customer notification alert...');
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

  await page.goto('https://foodlink-beige.vercel.app', { waitUntil: 'networkidle2', timeout: 35000 });
  await new Promise(r => setTimeout(r, 1500));

  // Trigger the ListingAlertPopup by simulating a window CustomEvent or dispatching to socket/broadcast channel
  await page.evaluate(() => {
    // Send message via BroadcastChannel
    try {
      const bc = new BroadcastChannel('foodlink_updates');
      bc.postMessage({
        type: 'NEW_LISTING',
        listing: {
          id: 'alert-demo-1',
          storeName: 'CAD Bakery',
          title: 'Artisan Pastry & Sourdough Surprise Bag',
          price: 4.99,
          originalPrice: 16.00,
          discount: '70% OFF',
          bagsAvailable: 4,
          photoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
        }
      });
    } catch(e) {}
  });

  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: join(outDir, 'mob-customer-alert-live.png') });
  console.log('✓ mob-customer-alert-live.png saved');

  await browser.close();
}

run();
