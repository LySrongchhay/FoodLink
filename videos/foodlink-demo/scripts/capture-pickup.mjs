import puppeteer from 'file:///C:/nvm4w/nodejs/node_modules/hyperframes/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const outDir = './assets/mobile-screenshots';
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

async function run() {
  console.log('Launching Chrome for customer active pickup capture...');
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

  await page.goto('https://foodlink-beige.vercel.app', { waitUntil: 'networkidle2', timeout: 30000 });

  await page.evaluate(() => {
    const user = { id: 'usr_demo_1', name: 'Dara Sok' };
    localStorage.setItem('foodlink_customer_user_v3', JSON.stringify(user));
    const activeOrder = {
      id: 'ord_demo_8492',
      orderNumber: '#FS-8492',
      pickupCode: '8492',
      storeName: 'CAD Bakery',
      storeAddress: '422 St 178, Daun Penh, Phnom Penh',
      items: [{
        title: 'Artisan Sourdough & Croissant Box',
        quantity: 1,
        price: 4.99,
        originalPrice: 16.00,
        photoUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80'
      }],
      totalPrice: 4.99,
      totalSaved: 11.01,
      pickupWindow: 'Today, 7:00 PM – 9:00 PM',
      status: 'PENDING_PICKUP'
    };
    localStorage.setItem('foodlink_active_order_usr_demo_1', JSON.stringify(activeOrder));
    localStorage.setItem('foodlink_order_history_usr_demo_1', JSON.stringify([activeOrder]));
  });

  // Reload page so it picks up state
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Click Reserved bottom tab
  const bottomTabs = await page.$$('button, div');
  for (const tab of bottomTabs) {
    const text = await page.evaluate(el => el.textContent, tab);
    if (text.includes('Reserved')) {
      await tab.click();
      await new Promise(r => setTimeout(r, 2000));
      break;
    }
  }

  await page.screenshot({ path: join(outDir, 'customer-pickup-code.png') });
  console.log('✓ customer-pickup-code.png captured!');

  await browser.close();
}

run();
