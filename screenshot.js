const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:/VSC/dsp/ss_home_hero.png' });

  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/VSC/dsp/ss_home_intro.png' });

  await page.evaluate(() => window.scrollTo(0, 1900));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/VSC/dsp/ss_home_counters.png' });

  await page.evaluate(() => window.scrollTo(0, 2900));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/VSC/dsp/ss_home_benefits.png' });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 900));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/VSC/dsp/ss_home_footer.png' });

  await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/VSC/dsp/ss_about.png' });

  await page.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/VSC/dsp/ss_contact.png' });

  await page.goto('http://localhost:5173/blog', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/VSC/dsp/ss_blog.png' });

  await browser.close();
  console.log('All screenshots saved.');
})();
