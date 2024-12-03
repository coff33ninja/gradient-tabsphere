import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

// Ensure the icons directory exists
const iconsDir = path.resolve(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
}

// Function to download the icon
const downloadIcon = async (iconUrl, iconName) => {
    const iconPath = path.resolve(iconsDir, iconName);

    const response = await axios({
        url: iconUrl,
        method: 'GET',
        responseType: 'stream',
    });

    return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(iconPath);
        response.data.pipe(writer);
        writer.on('finish', () => resolve(iconPath));
        writer.on('error', reject);
    });
};

// Function to scrape icon URL and download it
export const scrapeAndDownloadIcon = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Find the icon link
        let iconLink = $('link[rel="icon"]').attr('href') || 
                      $('link[rel="shortcut icon"]').attr('href') ||
                      $('link[rel="apple-touch-icon"]').attr('href');

        // Make the icon link absolute if it's relative
        if (iconLink && !iconLink.startsWith('http')) {
            const parsedUrl = new URL(url);
            if (iconLink.startsWith('//')) {
                iconLink = `https:${iconLink}`;
            } else if (iconLink.startsWith('/')) {
                iconLink = `${parsedUrl.protocol}//${parsedUrl.host}${iconLink}`;
            } else {
                iconLink = `${parsedUrl.protocol}//${parsedUrl.host}/${iconLink}`;
            }
        }

        // Download the icon if a valid link is found
        if (iconLink) {
            const iconName = `${Buffer.from(url).toString('base64').slice(0, 32)}.ico`;
            const savedIconPath = await downloadIcon(iconLink, iconName);
            return savedIconPath;
        }

        return null;
    } catch (error) {
        console.error(`Error scraping icon from ${url}:`, error);
        return null;
    }
};