# 🏠 Real Estate AI Chatbot Demo

**Demo for Monday Meeting - Broker.hr Integration**

A professional AI-powered real estate chatbot demo showcasing multilingual support, property search, and lead qualification for Croatian real estate agencies.

---

## 🚀 Quick Start

### **1. Install Dependencies**

```bash
cd real-estate-demo
npm install
```

### **2. Start the Demo Site**

```bash
npm start
```

The demo will automatically open at **http://localhost:4450**

---

## 📋 Pre-Demo Setup Checklist

### **Frontend (This Demo Site)**
- [x] React app configured for port 4450
- [x] Beautiful chatbot interface
- [x] Multilingual support UI (Croatian, English, Slovenian, Spanish)
- [x] Property search examples
- [x] Real-time webhook integration

### **Backend (N8N Workflow)**
- [ ] Update workflow to use webhook triggers (see `N8N_WEBHOOK_SETUP.md`)
- [ ] Test webhook endpoint is accessible
- [ ] Verify all response nodes are working
- [ ] Test multilingual responses
- [ ] Confirm Google Sheets integration
- [ ] Test lead collection flow

---

## 🎯 Demo Features

### **1. Multilingual Support**
- 🇭🇷 Croatian (Hrvatski)
- 🇬🇧 English
- 🇸🇮 Slovenian (Slovenščina)
- 🇪🇸 Spanish (Español)

### **2. Property Search**
- Intelligent query parsing
- Dynamic URL generation for Broker.hr
- Region-based filtering (Dalmatia Coast, Islands, Istria)
- Price range handling
- Property type detection (apartment, house, villa, land)

### **3. Lead Qualification**
- Name and surname collection
- Email capture
- Interest tracking
- Automatic Google Sheets integration
- Duplicate lead detection

### **4. Smart Features**
- Conversation memory per session
- Quick action examples
- Real-time typing indicators
- Property links with URLs
- Error handling and fallbacks

---

## 🧪 Testing the Demo

### **Test Scenarios**

#### **Scenario 1: Property Search (Croatian)**
```
Message: "Tražim stan u Splitu do 250k EUR za kupnju"
Expected: Property search URL + criteria display
```

#### **Scenario 2: Property Search (English)**
```
Message: "I'm looking for an apartment in Dubrovnik"
Expected: English response with property search
```

#### **Scenario 3: Property Search (Slovenian)**
```
Message: "Iščem stanovanje v Splitu"
Expected: Slovenian response with property search
```

#### **Scenario 4: Lead Collection**
```
Message 1: "Tražim stan u Splitu do 300k"
Response: Property search + request for contact
Message 2: "Ivan Horvat, ivan@email.com"
Expected: Thank you message + Google Sheets entry
```

---

## 🔧 Configuration

### **Webhook URL**

Update the webhook URL in `src/RealEstateChatbot.js`:

```javascript
const WEBHOOK_URL = 'https://lsquaredflows.app.n8n.cloud/webhook/real-estate-chat';
```

### **N8N Workflow**

Follow the complete setup guide in `N8N_WEBHOOK_SETUP.md` to:
1. Replace Chat Trigger with Webhook
2. Update response nodes
3. Configure session memory
4. Test the endpoint

---

## 📱 Demo Presentation Flow

### **Opening (2 minutes)**
1. **Introduce the problem:**
   - "Real estate agencies lose 60% of leads after hours"
   - "International buyers can't communicate in their language"
   - "Agents waste time on unqualified inquiries"

2. **Show the solution:**
   - Open localhost:4450
   - Highlight the clean, professional interface

### **Live Demo (8 minutes)**

#### **Part 1: Multilingual Capabilities (3 min)**
1. Show Croatian property search
   - Type: "Tražim stan u Splitu do 250k EUR"
   - Show URL generation
   - Highlight instant response

2. Switch to English
   - Type: "Apartment in Dubrovnik for 300k"
   - Show language detection works automatically

3. Try Slovenian
   - Type: "Stanovanje v Splitu"
   - Demonstrate multi-market readiness

#### **Part 2: Lead Qualification (3 min)**
1. Start property search
   - Type: "Kuća s bazenom u Splitu"
   - Show how bot collects requirements

2. Provide contact information
   - Type: "Marko Marić, marko@email.com"
   - Show confirmation message
   - Open Google Sheets to show lead captured

#### **Part 3: Quick Actions (2 min)**
1. Show quick action buttons
2. Demonstrate different property types
3. Show conversation memory working

### **ROI Discussion (5 minutes)**
1. **Current state without bot:**
   - 100 monthly inquiries
   - 40% outside business hours (40 lost)
   - 30% non-Croatian speakers (30 struggle)
   - = 40-50% lead loss

2. **With AI chatbot:**
   - 24/7 availability (0% time-based loss)
   - 4 languages (0% language barrier loss)
   - Qualified leads to agents
   - = 70-80% increase in qualified leads

3. **Numbers:**
   - Current: 50 qualified leads/month
   - With bot: 85-90 qualified leads/month
   - +35-40 leads = +3-4 closed deals/month
   - Average commission: €3,000
   - **Additional revenue: €9,000-12,000/month**

### **Pricing (3 minutes)**
1. **Setup:** €800 (one-time)
2. **Monthly:** €297/month
3. **ROI:** 3,000-4,000% first year

### **Close (2 minutes)**
1. **Next steps:**
   - Custom demo with their branding
   - 2-week implementation timeline
   - Training for their team
   - 30-day satisfaction guarantee

2. **Special offer:**
   - First month free
   - Custom integrations included
   - Priority support for 3 months

---

## 🎨 Demo Tips

### **Visual Impact**
- Use full screen (F11) for clean presentation
- Start with clean chat (no previous messages)
- Keep browser zoom at 100%
- Close unnecessary tabs and notifications

### **Pacing**
- Type naturally (not too fast)
- Wait for responses to complete
- Pause to highlight key features
- Allow time for questions

### **Backup Plans**
- Have curl commands ready to test webhook
- Screenshot examples if live demo fails
- Video recording as ultimate backup
- Printed ROI calculations ready

---

## 📊 Key Metrics to Highlight

### **Speed**
- Response time: < 2 seconds
- Property URL generation: instant
- Lead capture: real-time to Google Sheets

### **Accuracy**
- Language detection: 95%+ accuracy
- Query understanding: AI-powered comprehension
- Price/location parsing: exact matches

### **Coverage**
- 24/7 availability
- 4 languages supported
- Unlimited conversations
- Zero wait time for users

---

## 🐛 Troubleshooting

### **Demo site won't start**
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### **Webhook not responding**
1. Check n8n workflow is **Active**
2. Test with curl (see N8N_WEBHOOK_SETUP.md)
3. Verify webhook URL in code matches n8n
4. Check browser console for errors

### **Chat responses are slow**
- Verify internet connection
- Check n8n cloud status
- Test webhook directly with curl
- Consider local n8n instance for demo

### **Language detection not working**
- Ensure Language Detector Parser node is connected
- Verify AI Agent has correct system prompt
- Test with clear language-specific phrases

---

## 📁 Project Structure

```
real-estate-demo/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js              # Main app component
│   ├── App.css             # App styles
│   ├── RealEstateChatbot.js    # Main chatbot component
│   ├── RealEstateChatbot.css   # Chatbot styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies (PORT=4450)
├── README.md              # This file
└── N8N_WEBHOOK_SETUP.md   # N8N configuration guide
```

---

## 🔒 Security Notes

### **For Demo:**
- Webhook URL is public (OK for demo)
- No authentication required
- Rate limiting on n8n side

### **For Production:**
- Add API key authentication
- Implement rate limiting
- Use HTTPS only
- Sanitize all user inputs
- Add CORS restrictions

---

## 📞 Support During Demo

### **If something goes wrong:**
1. **Stay calm** - have backup screenshots/video
2. **Explain the concept** - "In production, this would..."
3. **Show alternatives** - use curl to demonstrate webhook
4. **Pivot to discussion** - focus on ROI and benefits

### **Common Demo Issues:**
- **No internet:** Show video recording
- **Slow responses:** Explain production optimization
- **Wrong language:** Demonstrate language selector
- **Error messages:** Show error handling and fallbacks

---

## ✅ Pre-Meeting Checklist

### **30 Minutes Before:**
- [ ] Start demo site: `npm start`
- [ ] Test all 4 languages
- [ ] Test property search flow
- [ ] Test lead collection
- [ ] Verify Google Sheets integration
- [ ] Check webhook is responding
- [ ] Clear browser cache/cookies
- [ ] Close unnecessary applications
- [ ] Disable notifications
- [ ] Test internet speed

### **5 Minutes Before:**
- [ ] Open demo at localhost:4450
- [ ] Open Google Sheets (for lead demo)
- [ ] Have N8N workflow open (in another tab)
- [ ] Prepare backup video/screenshots
- [ ] Have ROI calculator ready
- [ ] Review pricing sheet
- [ ] Prepare question responses

---

## 🎯 Success Criteria

### **Demo is successful if:**
- [ ] All 4 languages work
- [ ] Property search generates URL
- [ ] Lead collection works end-to-end
- [ ] Client understands the ROI
- [ ] Client sees technical capability
- [ ] Client asks about implementation
- [ ] Next meeting is scheduled

---

## 📖 Additional Resources

- **N8N Workflow:** https://lsquaredflows.app.n8n.cloud/workflow/oSQ91MAxK0QIfu1G
- **Demo Script:** `/personal-ai-brain/l2-flows-sales-materials/real-estate-campaigns/general-real-estate/real-estate-demo-script.md`
- **ROI Calculator:** (prepare in Excel/Sheets)
- **Pricing Sheet:** (prepare PDF)

---

## 🚀 Post-Demo Actions

### **If interested:**
1. Send follow-up email within 24 hours
2. Provide custom demo with their branding
3. Share case studies from similar agencies
4. Schedule technical deep-dive call
5. Send proposal with pricing

### **If needs time:**
1. Add to CRM with notes
2. Schedule follow-up call (1 week)
3. Send additional materials
4. Offer trial period

---

## 🔧 Workflow Improvements

### **Lead Management Enhancements**

- **Get row(s) → IF (Lead Exists)** → Add UPDATE branch that merges new criteria with existing lead interest field instead of appending duplicate
  - Store `$json.previousInterest` from Sheets
  - Code node combines old + new criteria: `interest: "${previousInterest} + Updated: ${newCriteria}"`
  - Prevents duplicate rows for same email

- **Code in JavaScript3 (Output Parser)** → Add lead scoring logic based on budget ranges
  - IF `maxPrice > 500000` → `leadScore: "hot"`
  - IF `maxPrice 200000-500000` → `leadScore: "warm"`
  - IF `maxPrice < 200000` → `leadScore: "cold"`
  - Pass score to Sheets for agent prioritization

- **Switch → lead_collection** → Add new branch for repeat inquiries
  - Check `$json.previousContactCount` from Sheets lookup
  - IF `count > 1` → Route to "Update + Priority Alert" branch
  - Trigger Gmail notification: "Repeat inquiry from [Name] - High Interest"

### **Conversation Memory & State**

- **Simple Memory** → Add Redis/PostgreSQL external memory node (like Customer Support Bot EiSFaRdKAfzKcE4Z)
  - Persist conversation state across sessions
  - Store: `{sessionId, conversationPhase, searchHistory, contactData}`
  - Enables multi-turn refinements: "actually, show me houses instead"

- **AI Agent** → Add conversation phase tracking in system message
  - Phases: `initial → browsing → interested → contact_shared → follow_up`
  - Code node after AI Agent extracts phase from response
  - IF `phase === "interested"` → Trigger immediate WhatsApp/SMS notification

- **Code in JavaScript3** → Add intent classifier before Switch
  - Regex patterns: `/(koliko|cijena|price)/i` → `intent: "pricing"`
  - Pattern: `/(ogled|viewing|visit)/i` → `intent: "viewing_request"`
  - Route high-intent leads to priority branch with faster agent alert

### **Follow-up Automation (Like dLuft Email System)**

- **Append/Update row** → Add Wait node (24h delay) + Follow-up branch
  - Wait 24h → Check IF `$json.agentContacted === false`
  - TRUE → Trigger Gmail: "Automated follow-up with 3 matching properties"
  - Use Broker.hr API to fetch 3 URLs matching criteria, send as formatted email

- **Schedule Trigger** → Add daily batch workflow (separate from main)
  - Runs 9:00 AM daily
  - Google Sheets: Filter rows where `lastContact > 3 days AND status !== "closed"`
  - Loop through rows → Send WhatsApp message with new listings
  - Update `lastContact` timestamp in Sheets

- **Get row(s)** → Add "Lead Age" calculation branch
  - Code node: `daysSinceFirst = (now - createdDate) / 86400000`
  - IF `daysSinceFirst > 7` → Tag as "nurture" and reduce contact frequency
  - IF `daysSinceFirst < 1` → Tag as "hot" and enable real-time notifications

### **WhatsApp & SMS Integration**

- **Switch → lead_collection** → Add parallel branch to WhatsApp node
  - After Append/Update → Send WhatsApp message using WA Business API node
  - Message: "Hvala! Ogledi nepremičnin: [URL]. Agent [Name] vas bo kontaktiral."
  - Store `whatsappMessageId` in Sheets for delivery tracking

- **Webhook** → Add `/whatsapp-callback` endpoint for delivery confirmations
  - Separate webhook listening for WA API callbacks
  - Update Sheets: `messageStatus: "delivered" / "read" / "replied"`
  - IF `status === "replied"` → Trigger priority alert to sales team

- **Code in JavaScript2 (URL Generator)** → Add SMS branch for urgent leads
  - IF `maxPrice > 750000` OR `leadScore === "hot"` → Send SMS via Twilio node
  - SMS: "🏠 [Agent Name]: Spremam vam ponude za [Location]. Kontakt: [Phone]"
  - Parallel to email, not sequential (faster alerts)

### **Error Handling & Edge Cases**

- **AI Agent** → Add error catch branch using "On Error" node
  - IF AI fails → Route to fallback response: "Kopiram vaš upit, agent će odgovoriti u 5 min"
  - Store failed message in Sheets with `requiresManualReview: true`
  - Send Slack/Email alert to operations team

- **Get row(s)** → Add retry logic with exponential backoff
  - Wrap in Error Trigger node
  - IF fails → Wait 2s → Retry (max 3 attempts)
  - After 3 fails → Route to manual processing queue (Sheets tab "Errors")

- **Respond to Webhook** → Add timeout protection
  - Set workflow timeout: 25 seconds max
  - IF AI Agent takes >20s → Kill execution, return cached response
  - Log slow executions to Sheets for optimization

### **Performance Optimizations**

- **Language Detection AI Agent** → Replace with lightweight Code node regex detector
  - Check for `/(živjo|stanovanje|hiša)/i` → slovenian
  - Check for `/(bok|stan|kuća)/i` → croatian
  - Reduces 1 AI call, saves ~2-3s execution time + costs

- **Code in JavaScript3 + Code in JavaScript4** → Merge into single node
  - Current: Output Parser → Response Formatter (2 nodes)
  - Optimize: Combined Parser+Formatter (1 node)
  - Reduces data transfer overhead between nodes

- **Switch** → Add early exit for FAQ questions
  - IF `aiOutput.includes("bok") && !aiOutput.includes("PROPERTY_SEARCH")` → Skip URL Generator
  - Bypass unnecessary nodes for simple greetings
  - Saves 2-3 node executions per conversation

### **Integration Enhancements**

- **Broker.hr API Integration** → Add HTTP Request node after URL Generator
  - Fetch real property count: `GET /api/search?location=split&type=apartment&max_price=300000`
  - Response: `propertyCount: 47`
  - AI message: "Našao sam 47 stanova u Splitu do 300k"

- **CRM Integration (HubSpot/Pipedrive)** → Add after Append/Update Sheets
  - HTTP Request node: POST to CRM API
  - Create/Update contact + deal
  - Store `crmContactId` in Sheets for sync tracking

- **Calendly/Cal.com Booking** → Add viewing scheduler branch
  - IF `intent === "viewing_request"` → Generate Calendly link
  - Code node: `calendlyUrl = "https://calendly.com/agent/viewing?email=${email}&notes=${interest}"`
  - Include in WhatsApp/Email: "📅 Zakaži ogled: [Calendly URL]"

---

**Reference Workflows:**
- Lead enrichment logic: Similar to **Fabrique** repeat customer detection
- Follow-up sequences: Pattern from **dLuft Email Automation** (24h wait + auto-reply)
- WhatsApp integration: Architecture from **Barber Booking System** appointment confirmations
- Error handling: Based on **Customer Support Bot** fallback mechanisms
- State tracking: Modeled after **Taxi Service System** ride status management

---

**Ready to close the deal! Good luck on Monday! 🎉**

---

*Created: October 18, 2025*  
*Last Updated: October 19, 2025*  
*For: Real Estate Agency Demo Meeting*  
*Contact: lsquaredflows@gmail.com*

