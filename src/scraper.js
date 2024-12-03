import axios from 'axios';
import * as cheerio from 'cheerio';

// Function to scrape icon URL
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

        // Instead of downloading to filesystem, return the URL directly
        if (iconLink) {
            return iconLink;
        }

        return null;
    } catch (error) {
        console.error(`Error scraping icon from ${url}:`, error);
        return null;
    }
};