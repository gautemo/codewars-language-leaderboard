const core = require('@actions/core');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const fs = require('fs');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const waitForDetails = async page => {
    let details = [];
    while(details.length === 0){
        await sleep(1000);
        details = await page.$$('details');
    }
    return details;
}

const getBoards = async apiKey => {
    const response = await fetch('https://europe-west1-codewars-leaderboard-1.cloudfunctions.net/getOpenLeaderboards', {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
        }
    });
    const boards = await response.json();
    console.log(`found boards: ${boards.join(', ')}`);
    return boards;
}

const timestamp = () => new Date().toISOString().replace(/\.|:/g, '-');

const screenshot = async (browser, board) => {
    try {
        const page = await browser.newPage();
        await page.goto(`https://codewars-leaderboard-1.web.app/${board}`);

        const details = await waitForDetails(page);
        for(const detail of details){
            detail.click();
            await sleep(500);
        };
        await sleep(500);
        
        console.log(`opened ${details.length} details`);
        if (!fs.existsSync(`history/${board}`)) {
            fs.mkdirSync(`history/${board}`)
        }
        const filename = `history/${board}/${timestamp()}.png`;
        await page.screenshot({ path: filename, fullPage: true });
        console.log(`took screenshot: ${filename}`);
        await browser.close();
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

async function run() {
  try { 
    const apiKey = core.getInput('api-key');
    const [browser, boards] = await Promise.all([puppeteer.launch(), getBoards(apiKey)]);
    const screenshots = boards.map(b => screenshot(browser, b));
    await Promise.all(screenshots);
  } 
  catch (error) {
      core.setFailed(error.message);
  }
}

run();