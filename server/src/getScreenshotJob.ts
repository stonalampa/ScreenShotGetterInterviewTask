import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import socketIo from 'socket.io';

export let latestScreenshotPath = '';
export const folderPath = __dirname + '/screenshots';
const url = 'https://play.google.com/store/apps/details?id=com.activision.callofduty.shooter';

const takeScreenshot = async (io: socketIo.Server) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    const screenshotBuffer = await page.screenshot();
    await browser.close();

    const timestamp = new Date().toISOString();
    const fileName = `screenshot-${timestamp}.png`;
    const filePath = path.join(folderPath, fileName);

    fs.writeFileSync(filePath, screenshotBuffer);
    latestScreenshotPath = filePath;

    io.emit('latestScreenshot', {
      name: fileName,
      base64: `data:image/png;base64,${screenshotBuffer.toString('base64')}`
    });
    console.log(`Screenshot saved: ${filePath}`);
  } catch (error) {
    console.error('Error taking screenshot:', error);
  }
};

export const setupScreenshotJob = (io: socketIo.Server, interval: number) => {
  setInterval(() => takeScreenshot(io), interval);
};