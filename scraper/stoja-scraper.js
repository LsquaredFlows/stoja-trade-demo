/**
 * Stoja Trade Website Scraper
 * Scrapes stoja-trade.si to build a knowledge base for RAG
 * Language: Slovenian
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

class StojaScraper {
  constructor() {
    this.baseUrl = 'https://www.stoja-trade.si';
    this.scrapedContent = [];
  }

  /**
   * Main scraping function
   */
  async scrapeAll() {
    console.log('🚀 Starting Stoja Trade scraper...');
    
    // Pages to scrape
    const pages = [
      { url: '/', name: 'Homepage' },
      { url: '/en', name: 'Homepage (EN)' },
      { url: '/nepremicnine', name: 'Nepremičnine' },
      { url: '/o-nas', name: 'O Nas' },
      { url: '/kontakt', name: 'Kontakt' },
    ];

    for (const page of pages) {
      await this.scrapePage(page.url, page.name);
      await this.delay(2000); // Be polite
    }

    // Save to files
    await this.saveToMarkdown();
    await this.saveToJSON();

    console.log(`✅ Scraping complete! Scraped ${this.scrapedContent.length} pages.`);
    return this.scrapedContent;
  }

  /**
   * Scrape a single page
   */
  async scrapePage(urlPath, pageName) {
    const fullUrl = `${this.baseUrl}${urlPath}`;
    console.log(`📄 Scraping: ${pageName} (${fullUrl})`);

    try {
      const response = await axios.get(fullUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);

      // Extract main content
      const content = {
        page: pageName,
        url: fullUrl,
        title: $('title').text().trim(),
        h1: $('h1').text().trim(),
        headings: [],
        paragraphs: [],
        lists: [],
        links: [],
        language: urlPath.includes('/en') ? 'English' : 'Slovenian'
      };

      // Extract headings
      $('h2, h3').each((i, elem) => {
        const text = $(elem).text().trim();
        if (text) content.headings.push(text);
      });

      // Extract paragraphs
      $('p').each((i, elem) => {
        const text = $(elem).text().trim();
        if (text && text.length > 20) content.paragraphs.push(text);
      });

      // Extract lists
      $('ul li, ol li').each((i, elem) => {
        const text = $(elem).text().trim();
        if (text) content.lists.push(text);
      });

      // Extract important links
      $('a[href]').each((i, elem) => {
        const href = $(elem).attr('href');
        const text = $(elem).text().trim();
        if (href && text && !href.startsWith('#') && !href.includes('javascript:')) {
          content.links.push({ text, href });
        }
      });

      this.scrapedContent.push(content);
      console.log(`  ✓ Extracted ${content.paragraphs.length} paragraphs, ${content.headings.length} headings`);

    } catch (error) {
      console.error(`  ✗ Error scraping ${pageName}:`, error.message);
    }
  }

  /**
   * Save content as structured Markdown for RAG
   */
  async saveToMarkdown() {
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Create a single combined markdown file
    let markdown = `# Stoja Trade - Znanje / Knowledge Base\n\n`;
    markdown += `**Vir / Source:** stoja-trade.si\n`;
    markdown += `**Datum / Date:** ${new Date().toLocaleDateString('sl-SI')}\n`;
    markdown += `**Jezik / Language:** Slovenščina (Slovenian)\n\n`;
    markdown += `---\n\n`;

    for (const page of this.scrapedContent) {
      markdown += `## ${page.page}\n\n`;
      markdown += `**URL:** ${page.url}\n`;
      markdown += `**Naslov / Title:** ${page.title}\n\n`;

      if (page.h1) {
        markdown += `### ${page.h1}\n\n`;
      }

      // Add headings and content
      page.headings.forEach(heading => {
        markdown += `#### ${heading}\n\n`;
      });

      page.paragraphs.forEach(para => {
        markdown += `${para}\n\n`;
      });

      if (page.lists.length > 0) {
        markdown += `**Ključne točke / Key Points:**\n\n`;
        page.lists.forEach(item => {
          markdown += `- ${item}\n`;
        });
        markdown += `\n`;
      }

      markdown += `---\n\n`;
    }

    const mdPath = path.join(outputDir, 'stoja-trade-knowledge-base.md');
    fs.writeFileSync(mdPath, markdown, 'utf-8');
    console.log(`📝 Markdown saved: ${mdPath}`);

    // Also create individual page files
    for (const page of this.scrapedContent) {
      const fileName = page.page.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.md';
      const filePath = path.join(outputDir, fileName);
      
      let pageMarkdown = `# ${page.page}\n\n`;
      pageMarkdown += `**URL:** ${page.url}\n`;
      pageMarkdown += `**Jezik / Language:** ${page.language}\n\n`;
      
      if (page.h1) pageMarkdown += `## ${page.h1}\n\n`;
      
      page.headings.forEach(h => pageMarkdown += `### ${h}\n\n`);
      page.paragraphs.forEach(p => pageMarkdown += `${p}\n\n`);
      
      if (page.lists.length > 0) {
        pageMarkdown += `### Ključne Točke\n\n`;
        page.lists.forEach(item => pageMarkdown += `- ${item}\n`);
      }

      fs.writeFileSync(filePath, pageMarkdown, 'utf-8');
    }

    console.log(`📂 Individual pages saved to: ${outputDir}`);
  }

  /**
   * Save raw JSON for reference
   */
  async saveToJSON() {
    const outputDir = path.join(__dirname, 'output');
    const jsonPath = path.join(outputDir, 'stoja-trade-raw-data.json');
    
    fs.writeFileSync(jsonPath, JSON.stringify(this.scrapedContent, null, 2), 'utf-8');
    console.log(`💾 JSON data saved: ${jsonPath}`);
  }

  /**
   * Delay helper
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run the scraper
if (require.main === module) {
  const scraper = new StojaScraper();
  scraper.scrapeAll()
    .then(() => {
      console.log('\n✅ All done! Knowledge base ready for RAG.');
      console.log('📁 Check the ./output/ folder for files.');
    })
    .catch(error => {
      console.error('❌ Scraping failed:', error);
      process.exit(1);
    });
}

module.exports = StojaScraper;

