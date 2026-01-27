const { chromium } = require('playwright');

module.exports = async (url) => {
  let email = '';

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { timeout: 20000 });
    await page.waitForTimeout(3000);

    const content = await page.content();

    const match = content.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );

    if (match) email = match[0];

    await browser.close();
  } catch {
    return '';
  }

  return email;
};