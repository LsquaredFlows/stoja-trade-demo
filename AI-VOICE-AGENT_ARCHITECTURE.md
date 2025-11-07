# 🎯 AI Voice Booking Agent - Stoja Trade
**Architecture: ElevenLabs + Twilio + n8n**

**Last Updated:** October 21, 2025  
**Status:** Design Phase  
**Target Client:** Stoja Trade (Zala)  
**Deal Value:** €500/month + €1,500 setup = €7,500 first year

---

## 📞 SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────┐
│  CLIENT CALLS +386 XX XXX XXXX (Stoja Trade number)    │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│  TWILIO (Phone System)                                  │
│  - Receives call on Slovenian number                    │
│  - Forwards audio stream to ElevenLabs                  │
│  - Handles call routing & recording                     │
└────────────────────┬────────────────────────────────────┘
                     ↓ (WebSocket audio stream)
┌─────────────────────────────────────────────────────────┐
│  ELEVENLABS CONVERSATIONAL AI                           │
│                                                          │
│  🎙️ Voice Agent "Maja" (Slovenian native speaker)      │
│                                                          │
│  Powers:                                                │
│  - Multilingual conversation (auto-detect language)     │
│  - Natural interruptions handling                       │
│  - Real-time function calling → n8n webhooks            │
│  - Voice quality: Ultra-realistic (Turbo v2.5 model)    │
│                                                          │
│  Functions Available (calls during conversation):       │
│  1. lookup_property(address) → Property details         │
│  2. check_agent_availability(region, date) → Time slots │
│  3. create_booking(data) → Confirms appointment         │
│                                                          │
│  Call duration: ~2-4 minutes                            │
└────────────────────┬────────────────────────────────────┘
                     ↓ (Function calls to n8n)
┌─────────────────────────────────────────────────────────┐
│  N8N WORKFLOWS (Smart Backend)                          │
│                                                          │
│  Workflow 1: Real-Time Call Functions (3 webhooks)      │
│  ├─ /property-lookup → Instant property match           │
│  ├─ /check-availability → Google Calendar API           │
│  └─ /create-booking → Books + alerts agent              │
│                                                          │
│  Workflow 2: Post-Call Processing (triggered by EL)     │
│  ├─ Extract conversation data                           │
│  ├─ Save lead to Google Sheets                          │
│  ├─ Send WhatsApp email request                         │
│  ├─ Send property photos                                │
│  ├─ Alert assigned agent                                │
│  └─ Schedule follow-ups                                 │
│                                                          │
│  Workflow 3: Reminder System (schedule trigger)         │
│  ├─ 24h before: Confirmation request                    │
│  ├─ 2h before: Final reminder                           │
│  └─ Next day: Post-viewing follow-up                    │
│                                                          │
│  Processing time: 3-8 seconds (async)                   │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│  MULTI-CHANNEL CONFIRMATIONS                            │
│  - WhatsApp: Property photos + appointment details      │
│  - SMS: Quick confirmation + Google Maps link           │
│  - Email: Full details (when captured via WhatsApp)     │
│  - Google Calendar: Events for client + agent           │
└─────────────────────────────────────────────────────────┘
```

---

## 🎙️ ELEVENLABS AGENT CONFIGURATION

### Agent Profile: "Maja" - Stoja Trade Receptionist

**Voice:** Matilda (ElevenLabs) - Natural, friendly, professional  
**Language Model:** GPT-4 Turbo (via ElevenLabs)  
**Language Support:** Slovenian (primary), Croatian, English, German, Italian

**Agent Settings:**
```json
{
  "agent_id": "stoja-trade-booking-agent",
  "voice_id": "XB0fDUnXU5powFXDhCwa",
  "model": "eleven_turbo_v2_5",
  "language": "mul",
  "conversation_config": {
    "interruptions_enabled": true,
    "end_of_speech_delay": 800,
    "max_duration": 600,
    "stability": 0.5,
    "similarity_boost": 0.8,
    "style": 0.2
  }
}
```

---

## 📝 ELEVENLABS SYSTEM PROMPT

```markdown
# System Identity
You are **Maja**, a professional receptionist for **Stoja Trade**, a real estate agency in Slovenia and Croatia.

**Your personality:**
- Warm, efficient, and helpful
- Native Slovenian speaker (but fluent in Croatian, English, German, Italian)
- Patient with elderly clients, energetic with younger clients
- Professional but friendly (use first names after introduction)

**Current date/time:** {{DATETIME}}

---

## Your Goal
Book property viewing appointments by:
1. Detecting caller's language (respond in same language)
2. Capturing: Name, Phone, Property interest
3. Checking agent availability
4. Confirming appointment time
5. Setting up the meeting

**Important:** Email is OPTIONAL - we'll send a WhatsApp link for that.

---

## Conversation Flow

### Step 1: Greeting (Auto-detect language)
**Slovenian:** "Dober dan! Tukaj Maja iz Stoja Trade. Kako vam lahko pomagam?"
**Croatian:** "Dobar dan! Ovdje Maja iz Stoja Trade. Kako vam mogu pomoći?"
**English:** "Good day! This is Maja from Stoja Trade. How can I help you?"

Listen to their first response → Detect language → Continue in that language.

---

### Step 2: Capture Name & Phone
"Lahko prosim dobim vaše ime in telefonsko številko za potrditev?"

**If they give only name:**
"Super, [Name]. In vaša telefonska številka?"

**If they resist:**
"Razumem. Telefonska številka je samo za potrditev ogleda in SMS opomnik. Brez nje žal ne moremo rezervirati termina."

**Store:** `name`, `phone`

---

### Step 3: Identify Property
"Katero nepremičnino vas zanima?"

**Scenarios:**

**A) Specific address given:**
User: "Stanovanje na Celovška 123"
→ Call function: `lookup_property(address: "Celovška 123")`
→ Receive: `{ property_id: "ST-123", type: "apartment", price: "€280,000", region: "ljubljana", available: true }`
→ Response: "Da, to stanovanje je na voljo za €280,000. Preverim razpoložljivost agentov..."

**B) General criteria:**
User: "Iščem hišo v Ljubljani do €400k"
→ Response: "Razumem - hiša v Ljubljani do €400,000. Imam več možnosti. Ali želite ogled določene hiše ali bi radi najprej videli seznam?"
→ If "seznam": "V redu, bom poslal seznam po WhatsApp. Kdaj bi bili na voljo za ogled?"
→ Store: `property_type: "house"`, `region: "ljubljana"`, `max_price: 400000`

**C) Browsing/unsure:**
User: "Ne vem točno, zanima me kaj imate"
→ Response: "Lahko! Kakšno nepremičnino iščete - stanovanje, hišo, poslovni prostor?"
→ Follow-up: "V kateri regiji? Ljubljana, obala, Maribor...?"
→ Store criteria → Proceed to general agent assignment

**Store:** `property_id` (if specific) OR `property_criteria` (if general)

---

### Step 4: Check Availability & Suggest Times
Call function: `check_agent_availability(region: "[region]", property_id: "[id]")`
→ Receive: `{ agent_name: "Marko Horvat", available_slots: ["2025-10-22T16:00", "2025-10-23T10:00", "2025-10-23T14:00"] }`

**Response:**
"Naš agent [Agent Name] je na voljo:
- Danes ob 16:00
- Jutri ob 10:00
- Jutri ob 14:00

Kateri termin vam ustreza?"

**If none fit:**
"Kateri dan in ura bi vam ustrezali?"
→ Parse their response → Call function again with custom date

**Store:** `appointment_datetime`, `agent_name`

---

### Step 5: Confirm & Book
"Odlično! Potrjujem:
- Ogled: [Property Type/Address]
- Datum: [Date] ob [Time]
- Agent: [Agent Name]
- Vaš kontakt: [Phone]

Ali je to pravilno?"

**If yes:**
→ Call function: `create_booking({ name, phone, property_id, datetime, agent })`
→ Receive: `{ booking_id: "BK-2025-456", status: "confirmed" }`

**Response:**
"Hvala, [Name]! Vaš ogled je potrjen. Poslal bom:
- SMS s potrditvijo
- WhatsApp z fotografijami nepremičnine in kontaktom agenta

Ali imate email za dodatne informacije?"

**If they give email:** Store it.
**If not:** "Ni problem - vse potrebno boste dobili na WhatsApp. Še kaj lahko pomagam?"

**End call gracefully:**
"Hvala za klic! Vidimo se [Date]. Lep dan še!"

---

### Step 6: Edge Cases

**Property not available:**
Function returns: `{ available: false }`
→ "Žal je ta nepremičnina že rezervirana. Imam pa podobne možnosti v [region]. Želite slišati?"

**No agents available:**
Function returns: `{ available_slots: [] }`
→ "Trenutno so vsi agenti zasedeni. Lahko vas pokličem nazaj v 30 minutah? Ali želite predlog za naslednji teden?"

**Call drops / technical issues:**
→ Immediately trigger n8n workflow:
  - SMS: "Hi [Name], izgubili smo povezavo. Pokličite nazaj: [Number] ali nadaljujte tukaj: [Chatbot Link]"

**Caller is rude/aggressive:**
→ Stay professional: "Razumem vašo frustracijo. Poskušam pomagati čim hitreje. Ali lahko prosim [repeat question]?"
→ If continues: "Za najboljšo pomoč, bom povezal s supervizorjem. En trenutek." → Transfer to human agent (Twilio forward)

---

## Language-Specific Variations

### Slovenian (Primary)
- Formal "vi" form (default)
- If caller uses "ti", mirror that informality
- Common phrases: "V redu", "Super", "Odlično", "Razumem"

### Croatian
- Formal "vi" form (default)
- Slightly more formal than Slovenian
- Common phrases: "U redu", "Super", "Odlično", "Razumijem"

### English
- Neutral accent (not too British/American)
- Keep it simple (many non-native speakers)
- Avoid idioms

---

## Quality Guardrails

**Do NOT:**
- Give pricing advice beyond listing price
- Discuss financing/mortgages (refer to agent)
- Make promises about property features (refer to listing)
- Keep caller on the line >5 minutes (book appointment, end gracefully)

**Always:**
- Repeat critical info (date, time, address)
- Confirm spelling of name if unclear
- Get phone number in local format (+386... or 0XX...)
- End with clear next steps ("You'll receive SMS in 2 minutes")

---

## Function Calling Rules

**When to call functions:**
1. `lookup_property()` → As soon as address/ID mentioned
2. `check_agent_availability()` → After property confirmed, before suggesting times
3. `create_booking()` → Only after user confirms "yes" to final summary

**Never call functions for:**
- General questions ("How much is property tax?") → Answer conversationally
- Complaints → Handle empathetically, offer callback
- Multiple properties → Get single selection first

---

## Success Metrics (Your Performance)
- **Booking rate:** >70% (7 out of 10 calls → confirmed appointment)
- **Call duration:** 2-4 minutes average
- **Caller satisfaction:** Natural, not robotic
- **Data quality:** 100% of bookings have name + valid phone + property + time

**You're not just a bot - you're the friendly voice of Stoja Trade!** 🏡
```

---

## ⚡ ELEVENLABS FUNCTION DEFINITIONS

### Function 1: lookup_property
```json
{
  "name": "lookup_property",
  "description": "Search for a property by address or ID to get details and check availability",
  "parameters": {
    "type": "object",
    "properties": {
      "address": {
        "type": "string",
        "description": "Property address or partial address (e.g., 'Celovška 123' or 'Ljubljana Šiška')"
      },
      "property_id": {
        "type": "string",
        "description": "Exact property ID if known (e.g., 'ST-2024-123')"
      }
    },
    "required": ["address"]
  },
  "webhook_url": "https://lsquaredflows.app.n8n.cloud/webhook/stoja-property-lookup"
}
```

**n8n Response Format:**
```json
{
  "success": true,
  "property": {
    "id": "ST-2024-123",
    "address": "Celovška cesta 123, Ljubljana",
    "type": "apartment",
    "price": "€280,000",
    "bedrooms": 2,
    "size_m2": 65,
    "region": "ljubljana mesto",
    "available": true,
    "photos_url": "https://stoja-trade.si/properties/ST-2024-123"
  }
}
```

---

### Function 2: check_agent_availability
```json
{
  "name": "check_agent_availability",
  "description": "Check which agents are available for property viewings in a specific region and date range",
  "parameters": {
    "type": "object",
    "properties": {
      "region": {
        "type": "string",
        "description": "Property region (ljubljana, maribor, obala, etc.)"
      },
      "property_id": {
        "type": "string",
        "description": "Specific property ID if known"
      },
      "preferred_date": {
        "type": "string",
        "description": "ISO date format YYYY-MM-DD (optional, defaults to today+tomorrow)"
      }
    },
    "required": ["region"]
  },
  "webhook_url": "https://lsquaredflows.app.n8n.cloud/webhook/stoja-check-availability"
}
```

**n8n Response Format:**
```json
{
  "success": true,
  "agent": {
    "name": "Marko Horvat",
    "phone": "+386 40 123 456",
    "region_specialty": ["ljubljana mesto", "ljubljana okolica"]
  },
  "available_slots": [
    {
      "datetime": "2025-10-22T16:00:00Z",
      "display": "Danes ob 16:00",
      "duration_minutes": 60
    },
    {
      "datetime": "2025-10-23T10:00:00Z",
      "display": "Jutri ob 10:00",
      "duration_minutes": 60
    },
    {
      "datetime": "2025-10-23T14:00:00Z",
      "display": "Jutri ob 14:00",
      "duration_minutes": 60
    }
  ]
}
```

---

### Function 3: create_booking
```json
{
  "name": "create_booking",
  "description": "Create a confirmed property viewing appointment after user confirms all details",
  "parameters": {
    "type": "object",
    "properties": {
      "caller_name": {
        "type": "string",
        "description": "Caller's full name"
      },
      "phone": {
        "type": "string",
        "description": "Phone number in format +386... or 0XX..."
      },
      "email": {
        "type": "string",
        "description": "Email address (optional)"
      },
      "property_id": {
        "type": "string",
        "description": "Property ID or 'general' for browsing appointments"
      },
      "property_criteria": {
        "type": "object",
        "description": "If no specific property, store search criteria",
        "properties": {
          "type": { "type": "string" },
          "region": { "type": "string" },
          "max_price": { "type": "number" }
        }
      },
      "appointment_datetime": {
        "type": "string",
        "description": "ISO datetime format"
      },
      "agent_name": {
        "type": "string",
        "description": "Assigned agent name"
      },
      "language": {
        "type": "string",
        "description": "Conversation language (slovenian/croatian/english)"
      },
      "call_recording_url": {
        "type": "string",
        "description": "Twilio recording URL"
      }
    },
    "required": ["caller_name", "phone", "appointment_datetime", "agent_name", "language"]
  },
  "webhook_url": "https://lsquaredflows.app.n8n.cloud/webhook/stoja-create-booking"
}
```

**n8n Response Format:**
```json
{
  "success": true,
  "booking": {
    "id": "BK-2025-456",
    "status": "confirmed",
    "calendar_event_id": "google_cal_xyz123",
    "confirmations_sent": {
      "sms": true,
      "whatsapp": true,
      "email": false
    }
  },
  "message_to_user": "Hvala! SMS in WhatsApp potrditev sta poslani. Agent Marko Horvat vas bo kontaktiral če bo kakršnakoli sprememba."
}
```

---

## 🔧 N8N WORKFLOW BREAKDOWN

### Workflow 1: Real-Time Function Handlers (35 nodes)

**Name:** `Stoja Voice Agent - Function Handlers`

#### Webhook 1: /stoja-property-lookup
1. Webhook Trigger (POST)
2. Code Node: Parse address input
3. Google Sheets: Lookup property (VLOOKUP equivalent)
4. Switch Node: Property found?
   - YES → Format response with property details
   - NO → Return "not_found" + suggest chatbot
5. Respond to Webhook (JSON)

#### Webhook 2: /stoja-check-availability
6. Webhook Trigger (POST)
7. Code Node: Parse region + date
8. Code Node: Agent Router (map region → agent list)
9. Google Calendar: Get Free/Busy (for assigned agents)
10. Code Node: Format time slots (next 7 days)
11. Code Node: Generate human-friendly display ("Danes ob 16:00")
12. Respond to Webhook (JSON with agent + time slots)

#### Webhook 3: /stoja-create-booking
13. Webhook Trigger (POST)
14. Code Node: Validate phone format (+386...)
15. Code Node: Parse datetime to local timezone
16. Google Sheets: Save lead (append row)
    - Columns: Name | Phone | Email | Property | DateTime | Agent | Language | Status | CallRecording
17. Google Calendar: Create event (agent's calendar)
18. Google Calendar: Create event (client calendar - if email provided)
19. Switch Node: Has email?
    - YES → Send calendar invite via Gmail
    - NO → Skip
20. WhatsApp: Send confirmation to client
21. WhatsApp: Send property photos (if specific property)
22. WhatsApp: Request email ("Reply with your email for updates")
23. SMS: Simple confirmation text
24. WhatsApp: Alert agent (lead details)
25. Set Success Flag
26. Respond to Webhook (JSON confirmation)

**Error Handling:**
27. Catch errors
28. Log to error sheet
29. Send fallback SMS
30. Respond with graceful failure

---

### Workflow 2: Post-Call Processing (20 nodes)

**Name:** `Stoja Voice Agent - Post-Call Automation`

**Trigger:** Webhook from ElevenLabs (call ended event)

1. Webhook Trigger: Call ended event
2. Parse call data (duration, transcript, booking_id)
3. Google Sheets: Update call duration
4. Switch Node: Booking created?
   - YES → Success flow
     5. Wait 5 minutes
     6. Google Sheets: Check if email received (via WhatsApp reply)
     7. Switch: Email captured?
        - YES → Send full details via Gmail
        - NO → Schedule reminder (24h)
     8. Airtable/Sheets: Log for analytics
   - NO → Follow-up flow
     9. Wait 2 hours
     10. WhatsApp: "Hi [Name], did you still want to book a viewing?"
     11. Send chatbot link as backup
     12. Tag lead as "incomplete_call"

13. Code Node: Calculate lead score
    - Has specific property = +50 points
    - Requested time within 48h = +30 points
    - Mentioned budget/financing = +20 points

14. Switch Node: Lead score
    - HOT (>80) → Urgent alert to agent
    - WARM (50-80) → Standard flow
    - COLD (<50) → Nurture sequence

15. Google Sheets: Update lead score column

---

### Workflow 3: Reminder & Follow-up System (25 nodes)

**Name:** `Stoja Voice Agent - Appointment Reminders`

#### Trigger 1: Daily at 9 AM
1. Schedule Trigger (cron: 0 9 * * *)
2. Google Sheets: Fetch all appointments for tomorrow
3. Loop: For each appointment
   4. WhatsApp: "Hi [Name]! Reminder: Tomorrow at [Time], viewing at [Address] with agent [Name]. Reply OK to confirm."
   5. Wait 3 hours
   6. Check for reply
   7. Switch: Confirmed?
      - YES → Mark as confirmed in sheet
      - NO → WhatsApp alert to agent
   8. Next iteration

#### Trigger 2: 2 hours before appointment
9. Schedule Trigger (runs every 15 min, checks for upcoming appointments)
10. Google Sheets: Fetch appointments in next 2 hours
11. Filter: Only unconfirmed
12. Loop: For each
   13. WhatsApp: "Final reminder: Viewing in 2 hours at [Address]. Google Maps: [link]"
   14. SMS: Same message (backup)

#### Trigger 3: Next day after viewing (6 PM)
15. Schedule Trigger (18:00 daily)
16. Google Sheets: Fetch yesterday's appointments
17. Loop: For each
   18. WhatsApp: "Hi [Name]! How was the viewing yesterday? We'd love your feedback: [ReviewFlow link]"
   19. Wait 24 hours
   20. Check for response
   21. Switch: Interested in property?
      - YES → Alert agent (hot lead)
      - NO → Ask about other properties
      - NO_RESPONSE → Add to nurture list

---

## 💡 INNOVATIVE FEATURES

### 1. Smart Email Capture
Instead of forcing email via voice:
- Voice AI asks for phone only
- n8n sends WhatsApp: "Click here to add your email: [link]"
- Mini web form (Vercel): Pre-filled name + phone, user adds email
- Submits → n8n webhook → Updates Google Sheets

### 2. Property Quick Match
- User mentions address
- ElevenLabs calls n8n webhook mid-conversation
- n8n returns property details in <2 seconds
- AI continues conversation with accurate info

### 3. No-Show Prevention
- Day before: WhatsApp confirmation request
- 2 hours before: Final reminder with Google Maps link
- Track confirmation rate
- Alert agent if unconfirmed

### 4. Multi-Property Handling
- User interested in multiple properties
- AI lists top 3 based on criteria
- User selects one
- Books appointment for that specific property

### 5. Lead Scoring
- Automatic scoring based on call content
- Hot leads (>80 points) → Urgent agent alert
- Warm leads → Standard flow
- Cold leads → Nurture sequence

---

## 💰 COST BREAKDOWN (ElevenLabs + Twilio)

### Per Call Costs:

**ElevenLabs Conversational AI:**
- Voice: $0.18/minute (Turbo v2.5 model)
- Avg call: 3 minutes = **$0.54 per call**
- Monthly (100 calls): **$54**

**Twilio Phone System:**
- Phone number: $1/month (Slovenian number)
- Incoming calls: $0.0085/minute
- Avg call: 3 minutes = **$0.026 per call**
- Monthly (100 calls + 200 SMS): **$16**

**WhatsApp Business (Twilio):**
- Template messages: $0.005 each
- Session messages: $0.0025 each
- Monthly (300 messages): **$1.50**

**Google Calendar API:** Free (up to 1M requests/day)  
**Google Sheets API:** Free

**Total Monthly Cost (100 calls):**
- ElevenLabs: $54
- Twilio: $16
- WhatsApp: $1.50
- **Total: $71.50/month**

---

## 💰 PRICING FOR STOJA TRADE

### AI Phone Bot Package
**€500/month**
- Includes: 100 calls/month (~300 minutes)
- ElevenLabs Conversational AI
- Multilingual support (5 languages: Slovenian, Croatian, English, German, Italian)
- 24/7 availability
- Real-time agent routing (13 agents)
- Automatic confirmations (WhatsApp + SMS)
- Call recordings + transcripts
- Lead capture to Google Sheets
- Google Calendar integration
- Post-viewing follow-ups

**Additional calls:** €2.50/call over 100

**Your margin:** €500 - €71.50 = **€428.50/month (85.7% margin)**

---

### Setup Fee: €1,500

**Includes:**
- ElevenLabs agent configuration + voice selection
- Twilio phone number setup (Slovenian +386)
- 3 n8n workflows (80 total nodes)
- Google Calendar integration (13 agents by region)
- WhatsApp Business API setup + template approval
- Property database sync to Google Sheets
- Agent routing logic (Ljubljana, Maribor, Obala, Croatia, etc.)
- Smart email capture system (WhatsApp → web form)
- Lead scoring algorithm
- 2 weeks of testing + optimization
- Team training session (2 hours, all 13 agents)
- Custom conversation script (multilingual)
- Call recording system
- Analytics dashboard setup

---

## 🚀 TECHNICAL SETUP TIMELINE

### Week 1: Core Infrastructure
**Day 1-2: ElevenLabs Setup**
- Create ElevenLabs account (Enterprise plan)
- Select voice: Matilda for "Maja"
- Configure agent with system prompt
- Add 3 function definitions
- Test in playground (5 test scenarios)

**Day 3-4: Twilio Setup**
- Buy Slovenian phone number (+386 XX XXX XXX)
- Configure voice webhook → ElevenLabs
- Enable call recording
- Test inbound call routing
- Set up call fallback (if ElevenLabs fails)

**Day 5-7: n8n Workflow 1**
- Deploy 3 webhooks (property lookup, availability, create booking)
- Connect to Google Sheets (Stoja property database)
- Connect to Google Calendar (13 agent calendars)
- Test each function independently
- Optimize response times (<2 seconds per function)

---

### Week 2: Integration & Testing
**Day 8-9: Connect ElevenLabs Functions**
- Add n8n webhook URLs to ElevenLabs
- Test real-time function calling
- Debug edge cases (property not found, no availability, etc.)

**Day 10-11: WhatsApp Business API**
- Set up Twilio WhatsApp sandbox
- Create message templates (confirmation, reminder, follow-up)
- Submit templates for Meta approval (24-48h wait)
- Test WhatsApp message delivery

**Day 12-14: Full Integration Testing**
- End-to-end test: Call → Book → Confirm → Remind
- Test all 5 languages (Slovenian, Croatian, English, German, Italian)
- Test edge cases (call drops, wrong info, rude callers)
- Optimize conversation flow for 2-3 min calls

---

### Week 3: Optimization & Training
**Day 15-17: n8n Workflows 2 & 3**
- Build post-call processing workflow
- Build reminder system (3 triggers)
- Test automated follow-ups
- Set up lead scoring
- Connect to analytics (optional: Airtable/Google Data Studio)

**Day 18-19: Client Training**
- 2-hour session with Zala + key agents
- Explain how system works
- Show Google Sheets lead tracking
- Train on Google Calendar integration
- Provide troubleshooting guide

**Day 20-21: Soft Launch**
- Add phone number to website (small CTA)
- Monitor first 20 calls closely
- Fix any issues immediately
- Gather feedback from agents
- Optimize based on real usage

---

## 📊 SUCCESS METRICS

### Call Performance
- **Booking rate:** >70% (7 out of 10 calls → appointments)
- **Average call duration:** 2-4 minutes
- **Language detection accuracy:** >95%
- **Function call response time:** <2 seconds
- **Call quality rating:** >4.5/5 (from callers)

### Operational Metrics
- **No-show rate:** <15% (with reminders)
- **Email capture rate:** >60% (via WhatsApp follow-up)
- **Agent response time:** <10 minutes (to urgent alerts)
- **System uptime:** >99.5%

### Business Impact
- **Lead cost:** <€5 per qualified lead (vs €15-20 for ads)
- **Agent time saved:** 2.5 hours/agent/day
- **After-hours leads:** Target 30% of total calls
- **Client satisfaction:** >4.5/5 rating

---

## 🎯 PITCH TO ZALA (ADD TO EXISTING OFFER)

### New Addon: AI Phone Bot

**The Problem:**
- Clients call after hours → No answer → Lost lead
- Agents spend 30+ minutes per day just scheduling viewings
- Manual back-and-forth to find available times
- Language barriers (German/Italian tourists)
- No automated reminders → High no-show rate (25%+)

**The Solution:**
- 24/7 AI receptionist "Maja"
- Books appointments in 2-3 minutes
- Speaks 5 languages fluently
- Instant WhatsApp confirmations
- Automatic reminders (no-shows drop to <15%)
- All data flows to your Google Sheet + Calendar

**ROI:**
- **Time saved:** 2.5 hours/agent/day × 13 agents = 32.5 hours/day
- **More leads:** Capture after-hours calls (30% increase)
- **Higher conversion:** Instant response = 3x better conversion
- **No no-shows:** Save 4-6 hours/week of wasted agent time

**Cost:** €500/month + €1,500 setup  
**Savings:** 32.5 hours/day × €20/hour × 20 days = €13,000/month in agent time  
**ROI:** 26x return in first month

---

## 📋 NEXT STEPS

### To Launch This for Stoja Trade:

1. **Get Approval:**
   - Present this document to Zala
   - Demo ElevenLabs voice quality (playground)
   - Show cost breakdown + ROI
   - Get commitment: €500/month + €1,500 setup

2. **Technical Prep:**
   - Create ElevenLabs account
   - Buy Twilio number
   - Set up n8n workflows
   - Configure Google Calendar for 13 agents

3. **Content Prep:**
   - Build Stoja property database in Google Sheets
   - Create agent routing logic (region mapping)
   - Write WhatsApp message templates
   - Design confirmation SMS templates

4. **Testing:**
   - Internal testing (10 calls)
   - Beta with 2-3 agents (20 calls)
   - Fix issues
   - Full launch

**Timeline:** 3 weeks from approval to launch  
**Risk:** Low (can fall back to chatbot if voice fails)  
**Upsell potential:** High (other agencies will want this)

---

## 💡 FUTURE ENHANCEMENTS

### Phase 2 (After 3 months):
- **AI learns from feedback:** Improve conversation based on successful bookings
- **Sentiment analysis:** Detect frustrated callers → Priority routing to human
- **Personalization:** Recognize returning callers by phone number
- **Multi-appointment booking:** Schedule multiple viewings in one call
- **Agent performance tracking:** Which agents close most phone leads

### Phase 3 (After 6 months):
- **Outbound calls:** AI calls leads who didn't book yet
- **Follow-up after viewing:** "Did you like the property? Want to make an offer?"
- **Mortgage pre-qualification:** Connect to bank API, check eligibility
- **Smart upsell:** "This property has 2 similar neighbors also for sale"

---

**Status:** Ready to present to Zala  
**Next Action:** Add to existing Stoja Trade offer as premium addon  
**Deal Value:** €6,000 setup + €6,000/year recurring = **€12,000 first year**

