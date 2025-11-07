# Stoja Trade Website Scraper

**Purpose:** Scrape stoja-trade.si content to build a Slovenian knowledge base for the RAG system.

---

## 🚀 Quick Start

### **1. Install Dependencies**
```bash
cd /Users/lukakraljevic/Desktop/work/LsquaredXXX/CURRENT_FUTURE/real-estate-demo/scraper
npm install
```

### **2. Run the Scraper**
```bash
npm run scrape
```

### **3. Check Output**
Files will be saved to `./output/`:
- `stoja-trade-knowledge-base.md` → Combined knowledge base (use this for RAG)
- `stoja-trade-raw-data.json` → Raw JSON data
- Individual page files: `homepage.md`, `o-nas.md`, etc.

---

## 📁 Output Format

### **Markdown Structure:**
```markdown
# Stoja Trade - Znanje / Knowledge Base

**Vir / Source:** stoja-trade.si
**Datum / Date:** 20. 10. 2025
**Jezik / Language:** Slovenščina (Slovenian)

---

## Homepage

**URL:** https://www.stoja-trade.si/
**Naslov / Title:** Stoja Trade - Nepremičninska agencija

### [Headings extracted from page]

[Paragraphs with full content]

**Ključne točke / Key Points:**
- [List items]

---
```

---

## 🔗 Next Steps: Upload to RAG

### **Option A: Manual Upload to n8n**
1. Open your Stoja Trade workflow in n8n
2. Add a "Document Default Data Loader" node
3. Upload `stoja-trade-knowledge-base.md`
4. Connect to Text Splitter → Embeddings → Pinecone

### **Option B: Google Drive Auto-Sync**
1. Upload `stoja-trade-knowledge-base.md` to Google Drive folder
2. Google Drive Trigger watches for new/updated files
3. Auto-vectorizes and updates Pinecone index

### **Option C: Direct Pinecone Upload (via n8n)**
1. Create a new n8n workflow: "Stoja Trade - Knowledge Update"
2. Manual Trigger → Read File (`stoja-trade-knowledge-base.md`)
3. Text Splitter → Embeddings OpenAI → Pinecone Insert

---

## 📋 What Pages Are Scraped?

Currently scraping:
- `/` → Homepage (Slovenian)
- `/en` → Homepage (English)
- `/nepremicnine` → Properties page
- `/o-nas` → About Us
- `/kontakt` → Contact

**To add more pages:** Edit `pages` array in `stoja-scraper.js` (line 17)

---

## 🎯 Recommended: Create New Pinecone Index

**Why?** Currently using Broker.hr knowledge base (Croatian), which may interfere with Stoja Trade (Slovenian).

**New Index Name:** `stoja-trade`

**Steps:**
1. Go to Pinecone dashboard
2. Create new index: `stoja-trade`
3. Dimension: 1536 (for OpenAI `text-embedding-ada-002`)
4. Metric: Cosine
5. Update n8n Pinecone node to use `stoja-trade` index

---

## 🛠️ Customization

### **Add More Pages:**
```javascript
const pages = [
  { url: '/', name: 'Homepage' },
  { url: '/storitve', name: 'Storitve' },  // Add this
  { url: '/blog', name: 'Blog' },          // Add this
];
```

### **Change Scraping Logic:**
Edit the `scrapePage()` function to extract different elements:
- `.property-card` → Property listings
- `.agent-info` → Agent contact info
- `.faq` → FAQ section

---

## ⚠️ Notes

- **Politeness:** 2-second delay between requests
- **User-Agent:** Set to look like a normal browser
- **Timeout:** 10 seconds per page
- **Error Handling:** Continues on failure (logs error)

---

## 📞 Support

If scraping fails, check:
1. Website structure changed?
2. Blocked by firewall/bot detection?
3. Network issues?

**Solution:** Update selectors in `stoja-scraper.js` or manually copy content into markdown files.

---

**Created by:** L² Flows  
**Date:** October 20, 2025

