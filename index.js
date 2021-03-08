const puppeteer = require('puppeteer');

(async () => {
    const machineName = process.argv[2];
    const ipEnding = process.argv[3];

    if (machineName === 'undefined') {
        throw new Error(`You need to provide the name of your computer. Got: ${machineName}.`);
    }

    if (ipEnding === undefined || isNaN(parseInt(ipEnding))) {
        throw new Error(`You need to provide the last part of your ip (a number). Got: ${ipEnding}.`);
    }

    console.log('Your IP ends with', ipEnding);
    console.log('Lunching the browser');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log('Visiting IMP');
    await page.goto('http://imp:1337/#/hosts');

    console.log('Selecting your machine');
    await page.select('select.form-control', machineName);

    await page.focus('input.form-control');
    console.log('Typing your IP');
    await page.keyboard.type(`${ipEnding}`);

    console.log('Submitting');
    await page.$eval('button.btn.btn-success', el => el.click());

    console.log('Closing the browser');
    await browser.close();
    console.log('Your IP has been updated');
})();