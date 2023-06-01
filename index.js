const puppeter = require("puppeteer");

(async () => {
  const browser = await puppeter.launch();

  const page = await browser.newPage();

  await page.goto(
    "https://portaladminusuarios.reniec.gob.pe/validacionweb/index.html#no-back-button"
  );
  await page.screenshot({ path: "reniec01.jpg" });
  await page.type("#dniInput", "74421968");
  await page.screenshot({ path: "reniec0.jpg" });
  //   await page.click("iframe");
  await page.click("#tst");
  await page.waitForSelector(".area");
  await page.screenshot({ path: "reniec2.jpg" });
  await browser.close();
})();
