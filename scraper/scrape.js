const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../shared/company-basic.json');

const cleanText = (text) => text.replace(/[^\x20-\x7E]/g, '').trim();

const extractCityFromAddress = (address) => {
  const knownCities = ['Surat', 'Ahmedabad', 'Rajkot', 'Vadodara', 'Mumbai', 'Pune', 'Delhi'];
  for (let city of knownCities) {
    if (address.toLowerCase().includes(city.toLowerCase())) return city;
  }

  const parts = address.split(',');
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].toLowerCase().includes('gujarat') && i > 0) {
      return parts[i - 1].trim();
    }
  }

  return '';
};

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();

  await page.goto('https://www.google.com/maps');
  await page.waitForTimeout(4000);

  console.log('🔍 Search and click a business card manually...');
  await page.waitForTimeout(10000); // Wait for user action

  const getText = async (selector) =>
    await page.$eval(selector, el => el.textContent)
      .then(cleanText)
      .catch(() => '');

  const getAttr = async (selector, attr) =>
    await page.$eval(selector, el => el.getAttribute(attr))
      .catch(() => '');

  const getLatLngFromUrl = (url) => {
    const match = url.match(/@([0-9.-]+),([0-9.-]+),/);
    if (match) {
      return {
        latitude: parseFloat(match[1]),
        longitude: parseFloat(match[2])
      };
    }
    return { latitude: null, longitude: null };
  };

  const url = page.url();
  const { latitude, longitude } = getLatLngFromUrl(url);

  const address = await getText('button[aria-label^="Address:"]');

  const newData = {
    name: await getText('h1.DUwDvf'),
    category: await getText('button.DkEaL'),
    address,
    city: extractCityFromAddress(address),
    phone: await getText('button[aria-label^="Phone:"]'),
    website: await page.$$eval('a', anchors => {
      const site = anchors.find(a =>
        a.getAttribute('aria-label')?.toLowerCase().includes('website:')
      );
      return site ? site.href : '';
    }).catch(() => ''),
    latitude,
    longitude,
  };

  // Load existing data safely
  let companies = [];
  if (fs.existsSync(filePath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      if (Array.isArray(parsed)) {
        companies = parsed;
      }
    } catch (e) {
      console.warn('⚠️ Failed to parse existing file. Starting fresh.');
    }
  }

  // ✅ Check for duplicate
  const isDuplicate = companies.some(c =>
    (c.name === newData.name && c.address === newData.address) ||
    (c.name === newData.name && c.website && c.website === newData.website)
  );

  if (isDuplicate) {
    console.log('⚠️ Duplicate company detected. Not adding.');
  } else {
    companies.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(companies, null, 2));
    console.log('✅ Company added to company-basic.json');
    console.log(newData);
  }

  await browser.close();
})();
