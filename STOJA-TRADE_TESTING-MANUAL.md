# Stoja Trade AI Chatbot - Testing Manual

**Prepared for:** Zala, Stoja Trade  
**Date:** October 20, 2025  
**Version:** 1.0 Demo

---

## 🚀 Quick Start

### **Live Demo:**
**https://stoja-trade-demo.vercel.app/**

### **Your CRM (Google Sheets):**
**https://docs.google.com/spreadsheets/d/14q9GLI3Xjx1O70fYg0QCqxyxBrM8mAyoq-6E5IzzoLs/edit?usp=sharing**

---

## 📋 How It Works

1. **User chats with bot** on your website
2. **Bot can answer questions about Stoja Trade** (using our simple knowledge base)
3. **Bot collects contact info** (name, email, phone, property preferences)
4. **Data automatically saves** to your Google Sheet (instant)
5. **Bot will generate property search links** (in production version)

### **✨ New: Simple Knowledge Base**
We've added a basic knowledge base about Stoja Trade so the bot can answer questions like:
- "Kdo dela pri Stoja Trade?" (Who works at Stoja Trade?)
- "Katere storitve nudite?" (What services do you offer?)
- "Kje delujete?" (Where do you operate?)

This is just a simple version for testing. The full version will have complete information about all your properties, agents, and services.

---

## 🧪 Testing Examples

### **Example 1: Simple Lead Capture**

**Copy this into the chatbot:**
```
Pozdravljeni, zanima me nakup stanovanja v Ljubljani.
Ime: Ana Novak
Email: ana.novak@test.com
Telefon: 041234567
```

**What happens:**
- Bot confirms receipt
- Opens your Google Sheet → See new row with Ana's data
- Bot asks if they want property suggestions

---

### **Example 2: Combined Lead + Property Interest**

**Copy this into the chatbot:**
```
Želim 2-sobno stanovanje v Ljubljani z okolico.
Peter Horvat, peter.horvat@gmail.com, 031987654q
```

**What happens:**
- Bot collects contact data → Saves to Google Sheet
- Bot understands property preferences and stores them
- Bot confirms receipt and asks if agent should contact

---

### **Example 3: Just Property Interest (No Contact Yet)**

**Copy this into the chatbot:**
```
Iščem stanovanje za nakup v Ljubljani
```

**What happens:**
- Bot asks clarifying questions about preferences
- Bot politely asks for contact info to send best offers
- Demonstrates natural conversation flow

---

### **Example 4: Knowledge Base Test (Ask About Stoja Trade)**

**Copy this into the chatbot:**
```
Kdo dela pri Stoja Trade?
```
or
```
Katere storitve nudite?
```

**What happens:**
- Bot answers using our simple knowledge base about Stoja Trade
- Shows company info, team members, services, or coverage areas
- Demonstrates AI can answer company-specific questions

---

### **Example 5: Multilingual Test (English)**

**Copy this into the chatbot:**
```
I'm looking for a 2-bedroom apartment in Ljubljana, budget 200k EUR.
Name: John Smith
Email: john.smith@test.com
Phone: +386 40 123 456
```

**What happens:**
- Bot responds in English (auto-detects language)
- Saves data to Google Sheet
- Asks if they want property suggestions

---

## ⚠️ Current Demo Limitations

This is a **demo version** with limited functionality for testing purposes.

### **What Works Now ✅**
- **Lead capture** → Fully functional, saves to Google Sheets
- **Language detection** → Slovenian, Croatian, English, Spanish, etc.
- **Knowledge base** → Simple version about Stoja Trade (company info, team, services)
- **Conversation flow** → Natural, handles questions about properties

### **What Needs Time ⏳**
- **Property search filters** → Not fully working yet, will be added in production version
- **Property URL generation** → Needs 1-2 weeks to integrate properly with your listings

### **Location Filters:**
**Full version will include:**
- All regions: Ljubljana mesto/okolica, Gorenjska, Primorska, Goriška, Hrvaška
- All property types from your CRM system
- Custom location routing to specific agents

### **Agent Routing:**
- **Demo version:** All leads go to one Google Sheet
- **Full version:** Smart routing by region/language/property type

### **Integrations:**
- **Demo version:** Google Sheets + Simple knowledge base
- **Full version:** 
  - 100kvadratov (your CRM, depending on feasibility)
  - WhatsApp alerts to agents
  - Email confirmations to clients
  - SMS notifications (optional)
  - Advanced RAG knowledge base

---

## 📊 What to Watch For

### **1. Lead Capture Speed** ✅
- Open the chatbot
- Open the Google Sheet (side by side)
- Send a test message with contact info
- **Watch the Google Sheet** → New row appears in 2-3 seconds

### **2. Language Detection** ✅
- Try Slovenian, English, Croatian
- Bot should respond in the same language

### **3. Knowledge Base Responses** ✅
- Ask questions about Stoja Trade
- Bot should answer using company information
- Try: "Kdo dela pri Stoja Trade?" or "Katere storitve nudite?"

### **4. Conversation Flow** ✅
- Bot should feel natural (not robotic)
- Should handle typos and variations
- Should ask for missing info (if name or email missing)
- Should politely request contact details for follow-up

---

## 💡 What You Can Customize

When you decide to proceed, we can customize:

### **Conversation Style:**
- Formal vs friendly tone
- Length of responses
- Emoji usage (or not)

### **Lead Qualification Questions:**
- Budget range
- Timeline (urgent/flexible)
- Financing needs (mortgage/cash)
- Preferred contact method

### **Property Filters:**
- All your regions and neighborhoods
- Property types (apartment, house, land, commercial)
- Special features (parking, balcony, furnished)
- Investment vs primary residence

### **Agent Routing Logic:**
- By region (Ljubljana → Agent A, Maribor → Agent B)
- By property type (luxury → Agent C, budget → Agent D)
- By language (English speakers → bilingual agent)
- Round-robin (distribute evenly across team)

### **Integration Options:**
- Google Sheets bridge (instant, works now)
- WhatsApp Business for agent notifications
- Email marketing (automated follow-ups)

---

## 📞 What Happens After Testing?

### **Immediate Next Steps:**
1. Test the chatbot with examples above
2. Share feedback (what you like, what to improve)
3. Answer the 10 questions from the email
4. Schedule 30-min call to discuss customization

### **Implementation Timeline (3-4 weeks):**

**Week 1: Technical setup**
- Connect to 100kvadratov (or Google Sheets bridge)
- Add all regions and property filters
- Setup 13-agent routing system
- Add WhatsApp notifications

**Week 2: Testing & optimization**
- Your team tests internally
- We refine conversation flow
- Train AI on your specific requirements
- Security & GDPR compliance check

**Week 3-4: Launch & training**
- Deploy to your website
- Train your team on how it works
- Monitor first week closely
- Optimize based on real usage

---

## 🎯 Key Benefits You'll See

### **For Your Agents:**
- **2.5 hours saved per agent per day** = 715 hours/year across your team
- No more manual lead entry
- Pre-qualified leads (budget, location, timeline already known)
- WhatsApp alerts (no more checking emails constantly)

### **For Your Clients:**
- **24/7 availability** (never miss after-hours leads)
- Instant property suggestions
- Multilingual support (30+ languages in full version)
- Fast response (2 seconds vs 2 hours)

### **For Your Business:**
- Track which portals bring best leads
- Measure response times
- Agent performance analytics
- Convert more leads (faster response = higher conversion)

---

**Prepared by:**  
Luka Kraljevic  
L² Flows | Smart Automation  
lsquaredflows@gmail.com
