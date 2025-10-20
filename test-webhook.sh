#!/bin/bash

# Real Estate Chatbot Webhook Test Script
# Tests the n8n webhook endpoint before demo

WEBHOOK_URL="https://lsquaredflows.app.n8n.cloud/webhook/real-estate-chat"

echo "🧪 Testing Real Estate Chatbot Webhook..."
echo "========================================"
echo ""

# Test 1: Croatian Property Search
echo "Test 1: Croatian Property Search"
echo "Message: 'Tražim stan u Splitu do 250k EUR za kupnju'"
echo "---"
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tražim stan u Splitu do 250k EUR za kupnju",
    "sessionId": "test_session_hr_001",
    "language": "croatian"
  }' \
  2>/dev/null | python3 -m json.tool
echo ""
echo "========================================"
echo ""

# Test 2: English Property Search
echo "Test 2: English Property Search"
echo "Message: 'I am looking for an apartment in Dubrovnik for 300k EUR'"
echo "---"
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I am looking for an apartment in Dubrovnik for 300k EUR",
    "sessionId": "test_session_en_002",
    "language": "english"
  }' \
  2>/dev/null | python3 -m json.tool
echo ""
echo "========================================"
echo ""

# Test 3: Slovenian Property Search
echo "Test 3: Slovenian Property Search"
echo "Message: 'Iščem stanovanje v Splitu do 200k EUR'"
echo "---"
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Iščem stanovanje v Splitu do 200k EUR",
    "sessionId": "test_session_sl_003",
    "language": "slovenian"
  }' \
  2>/dev/null | python3 -m json.tool
echo ""
echo "========================================"
echo ""

# Test 4: Spanish Property Search
echo "Test 4: Spanish Property Search"
echo "Message: 'Busco apartamento en Split hasta 250k EUR'"
echo "---"
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Busco apartamento en Split hasta 250k EUR",
    "sessionId": "test_session_es_004",
    "language": "spanish"
  }' \
  2>/dev/null | python3 -m json.tool
echo ""
echo "========================================"
echo ""

# Test 5: Conversation (General Question)
echo "Test 5: General Conversation"
echo "Message: 'Koliki je porez na nekretnine u Hrvatskoj?'"
echo "---"
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Koliki je porez na nekretnine u Hrvatskoj?",
    "sessionId": "test_session_hr_005",
    "language": "croatian"
  }' \
  2>/dev/null | python3 -m json.tool
echo ""
echo "========================================"
echo ""

echo "✅ Webhook tests completed!"
echo ""
echo "Expected responses:"
echo "- Tests 1-4: Should return property search URLs and criteria"
echo "- Test 5: Should return information about property taxes"
echo ""
echo "If you see errors or empty responses:"
echo "1. Check that n8n workflow is ACTIVE"
echo "2. Verify webhook URL is correct"
echo "3. Check n8n execution logs"
echo "4. Follow N8N_WEBHOOK_SETUP.md guide"

