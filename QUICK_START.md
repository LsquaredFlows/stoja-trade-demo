# 🚀 Quick Start Guide - Real Estate Demo

**Ready in 5 minutes for your Monday meeting!**

---

## Step 1: Install Dependencies (2 minutes)

```bash
cd /Users/lukakraljevic/Desktop/work/LsquaredXXX/CURRENT_FUTURE/real-estate-demo
npm install
```

✅ Done when you see: "added 1328 packages"

---

## Step 2: Update N8N Workflow (See N8N_WEBHOOK_SETUP.md)

**Critical Changes Needed:**

1. **Replace Chat Trigger with Webhook Node**
   - Remove: `When chat message received` 
   - Add: `Webhook` node with path `real-estate-chat`

2. **Update Response Nodes**
   - Replace all `Respond to Chat` nodes
   - With: `Respond to Webhook` nodes

3. **Test Webhook**
   ```bash
   ./test-webhook.sh
   ```

**Full instructions:** See `N8N_WEBHOOK_SETUP.md`

---

## Step 3: Start the Demo (1 minute)

```bash
npm start
```

🎉 Demo opens automatically at **http://localhost:4450**

---

## Step 4: Test Everything (2 minutes)

### **Test Checklist:**

- [ ] **Croatian:** "Tražim stan u Splitu do 250k EUR"
- [ ] **English:** "Apartment in Dubrovnik for 300k"
- [ ] **Slovenian:** "Stanovanje v Splitu"
- [ ] **Spanish:** "Apartamento en Dubrovnik"
- [ ] **Lead Collection:** Provide name, surname, email
- [ ] **Check Google Sheets** for new lead

---

## Troubleshooting

### **"Cannot find module" errors**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Port 4450 already in use**
```bash
# Find and kill the process
lsof -ti:4450 | xargs kill -9
npm start
```

### **Webhook not responding**
1. Check n8n workflow is **ACTIVE**
2. Run: `./test-webhook.sh`
3. Check n8n execution logs
4. Verify webhook URL in `src/RealEstateChatbot.js`

---

## Pre-Demo Checklist (5 minutes before meeting)

- [ ] Demo running at localhost:4450
- [ ] Tested all 4 languages
- [ ] Webhook responding (< 2 sec)
- [ ] Google Sheets integration working
- [ ] Browser notifications disabled
- [ ] Full screen mode ready (F11)
- [ ] Backup screenshots/video ready

---

## Demo Flow (15 minutes)

1. **Introduction (2 min)** - Show problem/solution
2. **Multilingual Demo (3 min)** - Test Croatian, English, Slovenian
3. **Lead Qualification (3 min)** - Full flow + Google Sheets
4. **ROI Discussion (5 min)** - Numbers and pricing
5. **Q&A & Close (2 min)** - Next steps

---

## Important URLs

- **Demo Site:** http://localhost:4450
- **N8N Workflow:** https://lsquaredflows.app.n8n.cloud/workflow/oSQ91MAxK0QIfu1G
- **Google Sheets:** (open in separate tab for demo)

---

## Emergency Backup Plan

If demo fails:
1. Use `./test-webhook.sh` to show webhook working
2. Show screenshots of working demo
3. Play video recording of demo
4. Focus on ROI discussion instead

---

**You're ready! Good luck! 🎉**

For detailed setup: `README.md`  
For n8n changes: `N8N_WEBHOOK_SETUP.md`  
For testing: `./test-webhook.sh`

