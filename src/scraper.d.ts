declare module '../scraper' {
    export function scrapeAndDownloadIcon(url: string): Promise<string | null>;
}