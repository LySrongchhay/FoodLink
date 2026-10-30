import puppeteer from 'file:///C:/nvm4w/nodejs/node_modules/hyperframes/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import { join } from 'node:path';

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const outDir = './assets';

async function run() {
  console.log('Capturing authentic 6-digit screens for Customer & Merchant...');
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

  // 1. Customer Screen with active 6-digit order
  await page.goto('https://foodlink-beige.vercel.app', { waitUntil: 'networkidle2', timeout: 35000 });
  await page.evaluate(() => {
    const user = { id: 'usr_demo_1', name: 'Dara Sok' };
    localStorage.setItem('foodlink_customer_user_v3', JSON.stringify(user));
    const activeOrder = {
      id: 'ord_demo_249726',
      orderNumber: '#FS-249726',
      pickupCode: '249726',
      storeName: 'CAD Bakery',
      storeAddress: '422 St 178, Daun Penh, Phnom Penh',
      items: [{
        title: 'Artisan Pastry & Sourdough Surprise Bag',
        quantity: 1,
        price: 4.99,
        originalPrice: 16.00,
        photoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
      }],
      totalPrice: 4.99,
      totalSaved: 11.01,
      pickupWindow: 'Today, 7:00 PM – 9:00 PM',
      status: 'PENDING_PICKUP'
    };
    localStorage.setItem('foodlink_active_order_usr_demo_1', JSON.stringify(activeOrder));
    localStorage.setItem('foodlink_order_history_usr_demo_1', JSON.stringify([activeOrder]));
  });

  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Click Reserved bottom tab
  const tabs = await page.$$('button, div');
  for (const t of tabs) {
    const txt = await page.evaluate(el => el.textContent, t);
    if (txt.includes('Reserved')) {
      await t.click();
      await new Promise(r => setTimeout(r, 1500));
      break;
    }
  }
  await page.screenshot({ path: join(outDir, 'mob-customer-reserved-6digit.png') });
  console.log('✓ mob-customer-reserved-6digit.png');

  // 2. Merchant App - Verify Pickup with 249726 typed & matched
  await page.goto('https://foodlink-merchants.vercel.app', { waitUntil: 'networkidle2', timeout: 35000 });
  await new Promise(r => setTimeout(r, 1500));

  // Click Verify Pickup
  const mBtns = await page.$$('button');
  for (const b of mBtns) {
    const txt = await page.evaluate(el => el.textContent, b);
    if (txt.includes('Scan Pickup Code') || txt.includes('Verify')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1500));

  // Type 249726 into input
  const input = await page.$('input');
  if (input) {
    await input.type('249726', { delay: 100 });
    await new Promise(r => setTimeout(r, 1200));
  }
  await page.screenshot({ path: join(outDir, 'mob-merchant-verify-typed.png') });
  console.log('✓ mob-merchant-verify-typed.png');

  await browser.close();
  console.log('Completed all 6-digit captures!');
}

run();
