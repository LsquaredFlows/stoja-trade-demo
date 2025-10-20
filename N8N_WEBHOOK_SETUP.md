# N8N Webhook Setup Guide

## Overview
This guide explains how to convert your existing real estate chatbot workflow from Chat Trigger to Webhook Trigger for the demo.

## Current Workflow ID
**Workflow ID:** `oSQ91MAxK0QIfu1G`  
**Name:** real estate cs lead capture CRM v2

---

## Changes Required

### 1. Replace Chat Trigger Node with Webhook Node

#### **REMOVE:**
- Node: `When chat message received` (Chat Trigger)
- Type: `@n8n/n8n-nodes-langchain.chatTrigger`

#### **ADD:**
- Node: `Webhook` (Standard Webhook Trigger)
- Type: `n8n-nodes-base.webhook`

#### **Webhook Configuration:**
```json
{
  "parameters": {
    "httpMethod": "POST",
    "path": "real-estate-chat",
    "responseMode": "responseNode",
    "options": {}
  },
  "type": "n8n-nodes-base.webhook",
  "typeVersion": 1.1,
  "position": [-1264, -16],
  "id": "WEBHOOK_NODE_ID",
  "name": "Webhook"
}
```

**Important Settings:**
- {{ httpMethod }}: `POST`
- {{ path }}: `real-estate-chat` (or your custom path)
- {{ responseMode }}: `responseNode` (so we can send custom responses)

---

### 2. Update Input Data Parsing

The webhook receives data differently than chat trigger. Update the **Language Detector Parser** (Code in JavaScript) node to handle webhook input:

**Current Input Format (Chat Trigger):**
```javascript
const chatTriggerData = $('When chat message received').first().json;
const userInput = chatTriggerData.chatInput || '';
const sessionId = chatTriggerData.sessionId || '';
```

**New Input Format (Webhook):**
```javascript
// Get webhook body data
const webhookData = $('Webhook').first().json.body || $('Webhook').first().json;
const userInput = webhookData.message || webhookData.chatInput || '';
const sessionId = webhookData.sessionId || `session_${Date.now()}`;
const language = webhookData.language || 'croatian';
```

**Replace in the Language Detector Parser node:**

Find this code block:
```javascript
// Get original chat input from Chat Trigger
const chatTriggerData = $('When chat message received').first().json;
const userInput = chatTriggerData.chatInput || '';
const sessionId = chatTriggerData.sessionId || '';
```

Replace with:
```javascript
// Get original input from Webhook
const webhookData = $('Webhook').first().json.body || $('Webhook').first().json;
const userInput = webhookData.message || webhookData.chatInput || '';
const sessionId = webhookData.sessionId || `session_${Date.now()}`;
const languageHint = webhookData.language || null;
```

---

### 3. Update Response Nodes

Replace all `Respond to Chat` nodes with `Respond to Webhook` nodes.

#### **Find and Replace:**

**Current Nodes:**
- `Respond to Chat`
- `Respond to Chat1`
- `Respond to Chat2`
- `Respond to Chat3`

**Replace with Webhook Response Node:**

```json
{
  "parameters": {
    "respondWith": "json",
    "responseBody": "={{ { \"response\": $json.response, \"url\": $json.url, \"language\": $json.language } }}"
  },
  "type": "n8n-nodes-base.respondToWebhook",
  "typeVersion": 1,
  "position": [x, y],
  "id": "RESPONSE_NODE_ID",
  "name": "Respond to Webhook"
}
```

**Key Parameters:**
- {{ respondWith }}: `json`
- {{ responseBody }}: Expression that returns the response object

**Example Response Body Expressions:**

For conversation responses:
```javascript
={{ { "response": $json.response, "language": $json.language, "type": $json.type } }}
```

For property search with URL:
```javascript
={{ { "response": $json.response, "url": $json.url, "language": $json.language, "type": "property_search" } }}
```

For lead collection:
```javascript
={{ { "response": $json.response, "language": $json.language, "type": "lead_collected" } }}
```

---

### 4. Update Session Memory Reference

The **Window Buffer Memory** node uses session ID from the chat trigger. Update it to use webhook session:

**Current:**
```json
{
  "sessionKey": "={{ $('When chat message received').item.json.sessionId }}"
}
```

**New:**
```json
{
  "sessionKey": "={{ $('Webhook').item.json.body.sessionId || 'default_session' }}"
}
```

---

### 5. Test Webhook Endpoint

After making changes, test the webhook:

**Webhook URL Format:**
```
https://lsquaredflows.app.n8n.cloud/webhook/real-estate-chat
```

**Test with curl:**
```bash
curl -X POST https://lsquaredflows.app.n8n.cloud/webhook/real-estate-chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tražim stan u Splitu do 250k EUR",
    "sessionId": "test_session_123",
    "language": "croatian"
  }'
```

**Expected Response:**
```json
{
  "response": "Pripremio sam vašu personaliziranu pretragu...",
  "url": "https://broker.hr/en/croatia-property/...",
  "language": "croatian",
  "type": "property_search"
}
```

---

## Step-by-Step Implementation

### **Step 1: Backup Current Workflow**
1. Open workflow in n8n
2. Click **Download** → Save as `real-estate-workflow-backup.json`

### **Step 2: Add Webhook Node**
1. Click **Add Node** (+ button)
2. Search for "Webhook"
3. Select `Webhook` node
4. Configure:
   - HTTP Method: `POST`
   - Path: `real-estate-chat`
   - Response Mode: `Response Node`

### **Step 3: Update Language Detector Parser**
1. Open **Code in JavaScript** node (Language Detector Parser)
2. Find lines that reference `$('When chat message received')`
3. Replace with `$('Webhook')` and update data access
4. Update to use `.body.message` instead of `.chatInput`

### **Step 4: Add Response Nodes**
1. At the end of each branch (conversation, property search, lead collection)
2. Add **Respond to Webhook** node
3. Configure response body with appropriate data

### **Step 5: Remove Chat Trigger Nodes**
1. Delete `When chat message received` node
2. Delete all `Respond to Chat` nodes
3. Delete `AI Agent1` (duplicate language detector)

### **Step 6: Update Connections**
1. Connect `Webhook` → `Code in JavaScript` (Language Detector)
2. Connect final nodes → `Respond to Webhook`
3. Ensure all paths lead to a webhook response

### **Step 7: Test Workflow**
1. **Activate** the workflow
2. Copy the webhook URL
3. Test with curl or Postman
4. Verify responses are correct

### **Step 8: Update Frontend**
1. Open `real-estate-demo/src/RealEstateChatbot.js`
2. Update `WEBHOOK_URL` constant:
   ```javascript
   const WEBHOOK_URL = 'https://lsquaredflows.app.n8n.cloud/webhook/real-estate-chat';
   ```

---

## Quick Reference: Node Replacements

| Old Node | Old Type | New Node | New Type |
|----------|----------|----------|----------|
| When chat message received | @n8n/n8n-nodes-langchain.chatTrigger | Webhook | n8n-nodes-base.webhook |
| Respond to Chat | @n8n/n8n-nodes-langchain.chat | Respond to Webhook | n8n-nodes-base.respondToWebhook |
| Respond to Chat1 | @n8n/n8n-nodes-langchain.chat | Respond to Webhook | n8n-nodes-base.respondToWebhook |
| Respond to Chat2 | @n8n/n8n-nodes-langchain.chat | Respond to Webhook | n8n-nodes-base.respondToWebhook |
| Respond to Chat3 | @n8n/n8n-nodes-langchain.chat | Respond to Webhook | n8n-nodes-base.respondToWebhook |

---

## Troubleshooting

### **Issue: Webhook returns empty response**
**Solution:** Ensure every execution path has a `Respond to Webhook` node.

### **Issue: Session ID not working**
**Solution:** Check that webhook body includes `sessionId` field and memory node references correct path.

### **Issue: Language detection fails**
**Solution:** Verify Language Detector Parser receives correct input from webhook body.

### **Issue: Frontend can't connect**
**Solution:** 
1. Check workflow is **Active**
2. Verify webhook URL is correct
3. Test with curl first
4. Check browser console for CORS errors

### **Issue: Response format incorrect**
**Solution:** Ensure `Respond to Webhook` nodes return JSON with expected fields (response, url, language, type).

---

## Final Checklist

Before the demo:
- [ ] Workflow is **Active**
- [ ] Webhook URL is accessible
- [ ] Test conversation flow works
- [ ] Test property search with URL generation
- [ ] Test lead collection and Google Sheets integration
- [ ] Test multilingual support (Croatian, English, Slovenian, Spanish)
- [ ] Frontend is connected to correct webhook URL
- [ ] Session memory persists across messages

---

## Support

If you encounter issues, check:
1. n8n execution logs for errors
2. Browser console for frontend errors
3. Webhook test responses with curl
4. Node connections and data flow

**Webhook Test Command:**
```bash
# Croatian property search
curl -X POST https://lsquaredflows.app.n8n.cloud/webhook/real-estate-chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tražim stan u Splitu do 300000 EUR za kupnju",
    "sessionId": "demo_session_001",
    "language": "croatian"
  }'

# English property search
curl -X POST https://lsquaredflows.app.n8n.cloud/webhook/real-estate-chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I am looking for an apartment in Dubrovnik",
    "sessionId": "demo_session_002",
    "language": "english"
  }'

# Lead submission
curl -X POST https://lsquaredflows.app.n8n.cloud/webhook/real-estate-chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Ivan Horvat, ivan@email.com",
    "sessionId": "demo_session_003",
    "language": "croatian"
  }'
```

---

**Ready for your Monday demo! 🚀**

