const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const filePath = `file://${path.resolve('print.html')}`;

  await page.goto(filePath, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: 'apresentacao.pdf',
    width: '1920px',
    height: '1080px',
    printBackground: true,
  });

  await browser.close();
})();
