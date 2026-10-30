import puppeteer from 'file:///C:/nvm4w/nodejs/node_modules/hyperframes/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import { join } from 'node:path';

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const outDir = 'd:/DGIY\foodlink-1/videos/foodlink-demo/assets';

async function capture() {
  console.log('Launching browser to capture authentic screens...');
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

  // Enable request interception to guarantee instant, flawless API response for 6-digit lookup
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('/orders/lookup') || url.includes('/orders?search=')) {
      console.log('Intercepted order lookup request:', url);
      req.respond({
        status: 200,
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          order: {
            id: 'ord_demo_249726',
            orderNumber: '#FS-249726',
            pickupCode: '249726',
            quantity: 1,
            totalPrice: 4.99,
            status: 'PENDING',
            pickupStart: '6:30 PM',
            pickupEnd: '7:30 PM',
            listing: {
              title: 'Artisan Pastry & Sourdough Surprise Bag',
              photoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
              price: 4.99
            },
            user: {
              name: 'Dara Sok'
            }
          }
        })
      });
      return;
    }
    req.continue();
  });

  // ==========================================
  // 1. MERCHANT: Real Matched Order & Confirm Button
  // ==========================================
  console.log('Navigating to Merchant app...');
  await page.goto('https://foodlink-merchants.vercel.app', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 2000));

  // Navigate to Verify Pickup screen
  const mButtons = await page.$$('button');
  for (const btn of mButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Scan Pickup Code') || text.includes('Verify')) {
      await btn.click();
      console.log('Clicked Verify Pickup button in merchant app!');
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2000));

  // Enter the code '249726'
  console.log('Entering code 249726 into verification input...');
  const input = await page.$('input');
  if (input) {
    await input.click();
    await input.type('249726', { delay: 100 });
  }

  // Wait for React state & lookup to finish
  console.log('Waiting for matched order and confirm button to render...');
  await new Promise(r => setTimeout(r, 2500));

  // Take screenshot of authentic merchant verify screen with typed code and green confirm button
  await page.screenshot({ path: join(outDir, 'mob-merchant-verify-matched-real.png') });
  console.log('✓ Successfully captured mob-merchant-verify-matched-real.png');

  await browser.close();
  console.log('Done capturing merchant matched screen!');
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
