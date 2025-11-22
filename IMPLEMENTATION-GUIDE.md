# Implementation Guide: CEO Comment Writer v2.3

Complete guide for deploying, configuring, and maintaining the CEO Comment Writer n8n workflow.

**Version:** 2.3 (AI Agent with Memory + Unlimited Feedback Loop)
**Estimated Setup Time:** 15-30 minutes
**Required Skills:** Basic n8n familiarity, API key management

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Testing](#testing)
5. [Deployment Checklist](#deployment-checklist)
6. [Troubleshooting](#troubleshooting)
7. [Maintenance](#maintenance)
8. [Security](#security)
9. [Rollback Plan](#rollback-plan)

---

## Prerequisites

### Required API Accounts

#### 1. Telegram Bot (2 min)

1. Open Telegram, search for `@BotFather`
2. Send `/newbot`
3. Follow prompts, name your bot (e.g., "Maria Comment Writer")
4. Copy Bot Token: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`
5. Get your Chat ID:
   - Send message to `@userinfobot`
   - Copy Chat ID: `123456789`

**Record your credentials:**
- Bot Token: `_________________________________`
- Chat ID: `_________________________________`

#### 2. Perplexity API (1 min)

1. Go to https://www.perplexity.ai/
2. Sign up / Log in
3. Navigate to API settings
4. Generate API key
5. Copy key: `pplx-xxx...`

**Record your credentials:**
- API Key: `_________________________________`

#### 3. OpenAI API (2 min)

1. Go to https://platform.openai.com/
2. Sign up / Log in
3. Navigate to API keys
4. Create new secret key
5. Copy key: `sk-xxx...`
6. Verify GPT-4 access in your account (requires paid tier)

**Record your credentials:**
- API Key: `_________________________________`
- GPT-4 Access: [ ] Verified

### n8n Instance Requirements

- **Version:** n8n 1.0.0 or higher
- **Deployment:** Self-hosted or n8n Cloud
- **Resources:** 2GB RAM, 2+ CPU cores (recommended)
- **Network:** Internet access for API calls, HTTPS for webhooks

---

## Installation

### Step 1: Import Workflow (2 min)

1. Open your n8n instance
2. Click **Workflows** (left sidebar)
3. Click **Add Workflow** button
4. Click **Import from File**
5. Select `ceo-comment-writer-workflow-multi.json` (v2.3)
6. Click **Import**
7. Verify 30+ nodes loaded successfully

**Verification:**
- [ ] Workflow imported successfully
- [ ] All nodes visible in canvas
- [ ] No import errors shown

### Step 2: Configure Telegram Credentials (3 min)

1. Go to **Credentials** (left sidebar)
2. Click **Add Credential**
3. Search for "Telegram"
4. Select **Telegram API**
5. Configure:
   - **Name:** `Telegram Bot`
   - **Access Token:** Paste your Bot Token from @BotFather
6. Click **Create**

**Link to nodes (11 total):**
Open each node, select "Telegram Bot" credential:
- [ ] Telegram Trigger
- [ ] Send Missing Fields Message
- [ ] Send Confirmation
- [ ] Send For Approval
- [ ] Telegram Approval Trigger
- [ ] Handle Approval
- [ ] Request Edit
- [ ] Request Improvement Feedback
- [ ] Telegram Edit Trigger
- [ ] Confirm Edited Comment
- [ ] Acknowledge Improvement
- [ ] Send Refined For Approval

### Step 3: Configure Perplexity Credentials (2 min)

1. Click **Add Credential**
2. Search for "HTTP Header Auth"
3. Select **HTTP Header Auth** (Generic)
4. Configure:
   - **Name:** `Perplexity API`
   - **Header Name:** `Authorization`
   - **Header Value:** `Bearer YOUR_PERPLEXITY_API_KEY`
5. Click **Create**

**Link to nodes (3 total):**
- [ ] Research Article
- [ ] Research Media Outlet
- [ ] Research Journalist

### Step 4: Configure OpenAI Credentials (2 min)

**Option A: HTTP Header Auth (recommended)**

1. Click **Add Credential**
2. Search for "HTTP Header Auth"
3. Configure:
   - **Name:** `OpenAI API`
   - **Header Name:** `Authorization`
   - **Header Value:** `Bearer YOUR_OPENAI_API_KEY`
4. Click **Create**

**Option B: Direct in Node**

Add Authorization header directly in each HTTP Request node:
```
Authorization: Bearer sk-your-openai-api-key
```

**Link to nodes (3 total):**
- [ ] GPT-4 Draft Comment
- [ ] Humanize Comment
- [ ] GPT-4 Refine Comment

### Step 5: Verify Profile Path (1 min)

Check the **Load Profile** code node to ensure the profile path matches your environment:

```javascript
// Update this path to match your installation
const profilesDir = 'D:\\Downloads\\SynologyDrive\\DDVB Analytics\\marketing-automation-n8n\\ceo-comment-writer\\profiles';
```

**Verification:**
- [ ] Path points to correct profiles/ directory
- [ ] `maria_arkhangelskaya.json` exists in profiles/
- [ ] `default.json` exists in profiles/

### Step 6: Activate Workflow (1 min)

1. Click **Active** toggle (top-right, next to workflow name)
2. Verify toggle turns green/blue
3. Check that webhook URLs are generated for Telegram triggers

**Verification:**
- [ ] Workflow status shows "Active"
- [ ] No activation errors
- [ ] Webhook URLs generated

---

## Configuration

### Node-by-Node Reference

#### Telegram Trigger
- **Updates:** `message`
- **Webhook ID:** Auto-generated
- **Expected Input:** Structured message with PERSON, MEDIA, QUESTION, CONTEXT

#### Parse Request with PERSON
- **Purpose:** Extract fields from Telegram message
- **Key Logic:** PERSON field parsing, name normalization, required field validation
- **Output:** Structured JSON with all parsed fields

#### Load Profile
- **Purpose:** Load JSON profile from filesystem
- **Fallback:** Uses default.json if profile not found
- **Error Handling:** Hardcoded minimal profile as last resort

#### Research Nodes (Perplexity)
- **Model:** `sonar`
- **Parallel Execution:** All 3 run simultaneously
- **Error Handling:** `continueOnFail: true` - workflow continues if research fails

#### GPT-4 Draft Comment
- **Model:** `gpt-4o`
- **Temperature:** 0.7
- **Max Tokens:** 3000
- **Output:** 9-part structured response

#### Humanize Comment
- **Model:** `gpt-4o`
- **Temperature:** 0.8 (higher for natural variation)
- **Max Tokens:** 2000
- **Purpose:** Remove AI patterns, natural Russian flow

#### Send For Approval
- **Format:** Comment + 4-button inline keyboard
- **Buttons:** Approve, Request Edits, Edit, Improve

### Input Field Configuration

| Field | Required | Example | Notes |
|-------|----------|---------|-------|
| PERSON | Optional | `maria` | Defaults to maria_arkhangelskaya |
| MEDIA | Required | `Sostav.ru` | Determines tone/length |
| QUESTION | Required | `Exact journalist question` | Must directly answer this |
| CONTEXT | Required | `https://...` or summary | Article/discussion context |
| TARGET LENGTH | Required | `1500-2000` | Characters, outlet-specific |

### Media Outlet Configuration

| Outlet | Default Length | Tone |
|--------|----------------|------|
| Sostav.ru | 1,500-2,000 | Industry insider |
| Cossa.ru | 1,200-1,800 | Digital marketing |
| Forbes Russia | 1,800-2,200 | CEO business |
| RBC | 1,500-2,000 | Authoritative |
| VC.ru | 1,200-1,800 | Startup-friendly |
| Sekret firmy | 1,500-2,200 | Management systems |
| Adindex.ru | 1,200-1,800 | Advertising insider |

---

## Testing

### Test 1: Complete Flow (Happy Path)

Send this message to your Telegram bot:

```
PERSON: maria
MEDIA: Sostav.ru
QUESTION: Как вы оцениваете роль дизайн-систем в современном брендинге?
CONTEXT: Статья на Sostav о важности дизайн-систем для брендов в 2024 году
TARGET LENGTH: 1500-2000 знаков
```

**Expected Results:**
- [ ] Confirmation message received (~2 seconds)
- [ ] Research phase executes (~10-15 seconds)
- [ ] Comment generated with 9-part structure (~25-35 seconds)
- [ ] Approval message with 4 buttons received (~40-50 seconds total)
- [ ] Character count within 1,500-2,000 range
- [ ] Russian text displays correctly (no encoding issues)

### Test 2: Missing Required Fields

Send incomplete message:

```
MEDIA: Sostav.ru
QUESTION: Test question
```

**Expected Results:**
- [ ] Error message listing missing fields (CONTEXT, TARGET LENGTH)
- [ ] Workflow stops appropriately
- [ ] Instructions for correct format provided

### Test 3: Approve Button

After receiving a comment:

1. Click "Approve" button
2. **Expected:** Confirmation message "Comment approved!"
3. **Expected:** Session ends cleanly

### Test 4: Request Edits Button

After receiving a comment:

1. Click "Request Edits" button
2. **Expected:** Prompt asking for feedback
3. Send feedback: "Shorten by 20%"
4. **Expected:** Revised comment with shorter length
5. **Expected:** Version counter shows "Version 2/..."

### Test 5: Improve Button

After receiving a comment:

1. Click "Improve" button
2. **Expected:** "Enhancing comment..." message
3. **Expected:** Improved version with more examples/originality
4. **Expected:** Approval buttons appear again

### Test 6: Multiple Iterations

1. Generate initial comment
2. Request edits: "Add statistics"
3. Request edits again: "More formal tone"
4. Click Approve
5. **Expected:** Version 3/... shows correctly
6. **Expected:** All feedback incorporated

### Test 7: Different Media Outlets

Test with each outlet to verify tone/length adaptation:

**Forbes Russia:**
```
PERSON: maria
MEDIA: Forbes Russia
QUESTION: Какие инновации вы внедрили в управление агентством?
CONTEXT: Интервью с CEO о трансформации бизнеса
TARGET LENGTH: 1800-2200 знаков
```

**VC.ru:**
```
PERSON: maria
MEDIA: VC.ru
QUESTION: Как стартапам выбрать брендинговое агентство?
CONTEXT: https://vc.ru/marketing/startup-branding-guide
TARGET LENGTH: 1200-1800 знаков
```

**Verification:**
- [ ] Forbes: More formal, business-focused, 1,800-2,200 chars
- [ ] VC.ru: Startup-friendly, practical, 1,200-1,800 chars

---

## Deployment Checklist

### Pre-Deployment

**API Accounts:**
- [ ] Telegram Bot created and token obtained
- [ ] Telegram Chat ID recorded
- [ ] Perplexity API key generated and tested
- [ ] OpenAI API key generated with GPT-4 access

**n8n Instance:**
- [ ] n8n version 1.0.0+ confirmed
- [ ] Sufficient resources available
- [ ] Internet connectivity verified

### Deployment

**Workflow Import:**
- [ ] JSON file imported successfully
- [ ] All 30+ nodes visible
- [ ] No import errors

**Credentials:**
- [ ] Telegram Bot credential created
- [ ] Perplexity API credential created
- [ ] OpenAI API credential created
- [ ] All 17 nodes linked to credentials

**Configuration:**
- [ ] Profile path verified in Load Profile node
- [ ] Profiles directory accessible
- [ ] maria_arkhangelskaya.json present
- [ ] default.json present

**Activation:**
- [ ] Workflow activated
- [ ] Webhook URLs generated
- [ ] No activation errors

### Post-Deployment

**Testing:**
- [ ] Test 1 (Complete Flow) passed
- [ ] Test 2 (Missing Fields) passed
- [ ] Test 3 (Approve) passed
- [ ] Test 4 (Request Edits) passed
- [ ] Test 5 (Improve) passed
- [ ] Test 6 (Multiple Iterations) passed
- [ ] Test 7 (Media Outlets) passed

**Quality Verification:**
- [ ] Russian text renders correctly
- [ ] Character counts accurate
- [ ] Maria's voice consistent
- [ ] No ethical boundary violations

### Sign-Off

**Deployed By:** _______________________ **Date:** _____________

**Approved By (Maria):** _______________________ **Date:** _____________

**Status:** [ ] Ready for Production [ ] Needs Additional Testing

---

## Troubleshooting

### Bot Doesn't Respond

**Symptoms:** No response from Telegram bot

**Check:**
- [ ] Workflow is **Active** (toggle on)
- [ ] Bot token is correct in credentials
- [ ] You sent message to correct bot
- [ ] Webhook URLs generated (check trigger nodes)

**Solutions:**
1. Deactivate and reactivate workflow
2. Test bot with `/start` command
3. Check n8n execution log for errors
4. Verify Telegram Bot API token hasn't expired

### Research Phase Fails

**Symptoms:** Research returns errors or empty results

**Check:**
- [ ] Perplexity API key valid
- [ ] API quota not exceeded
- [ ] `continueOnFail: true` set on research nodes
- [ ] Network connectivity to Perplexity API

**Solutions:**
1. Verify API key in credentials
2. Check Perplexity dashboard for usage
3. Test API with curl:
```bash
curl -X POST https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"sonar","messages":[{"role":"user","content":"Test"}]}'
```

### GPT-4 Doesn't Generate Comments

**Symptoms:** Empty or malformed comments

**Check:**
- [ ] OpenAI API key valid
- [ ] GPT-4 model access granted (paid tier)
- [ ] API quota/billing active
- [ ] Request format correct (JSON body)

**Solutions:**
1. Test API key with curl:
```bash
curl -X POST https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Test"}]}'
```
2. Verify billing settings on OpenAI dashboard
3. Check max_tokens setting (should be 2000-3000)
4. Review system prompt for syntax errors

### Russian Text Encoding Issues

**Symptoms:** Cyrillic characters appear as gibberish

**Check:**
- [ ] UTF-8 encoding in all nodes
- [ ] Telegram API supports Unicode
- [ ] JSON body preserves Cyrillic

**Solutions:**
1. Add header: `Content-Type: application/json; charset=utf-8`
2. Test with simple Russian text: "Привет"
3. Check n8n instance locale settings
4. Verify profile JSON files saved as UTF-8

### Approval Buttons Not Working

**Symptoms:** Clicking buttons has no effect

**Check:**
- [ ] Telegram Approval Trigger is active
- [ ] Callback data format matches parsing logic
- [ ] Webhook generated for approval trigger
- [ ] Parse logic matches callback_data structure

**Solutions:**
1. Review callback_data in "Send For Approval" node
2. Check "Parse Approval Action" node logic
3. Test button click and check execution log
4. Verify callback query permissions in bot settings

### Profile Not Loading

**Symptoms:** Warning "Profile not found, using default"

**Check:**
- [ ] Profile file exists in profiles/ directory
- [ ] Filename matches profile_id (lowercase, underscores)
- [ ] JSON syntax valid
- [ ] Person mapping in Parse Request node

**Solutions:**
1. Run validation: `node validate-profile.js filename.json`
2. Check for typos in filename
3. Verify path in Load Profile node
4. Add name mapping to personMap

### Session Not Found Error

**Symptoms:** "Session not found" when clicking buttons

**Causes:**
- n8n was restarted (clears static data)
- Too long between request and button click
- Multiple users conflicting

**Solutions:**
1. Start new request
2. Avoid long delays between request and approval
3. Consider PostgreSQL persistence (future enhancement)

---

## Maintenance

### Daily Tasks

- [ ] Monitor execution logs for errors
- [ ] Check API quota usage (Perplexity, OpenAI)

### Weekly Tasks

- [ ] Review failed executions and identify patterns
- [ ] Test workflow with sample request
- [ ] Check API costs and optimize if needed
- [ ] Review comment quality samples

### Monthly Tasks

- [ ] Update Maria's voice guidelines based on feedback
- [ ] Add successful comment examples to prompt
- [ ] Review and update media outlet profiles
- [ ] Rotate API keys (security best practice)
- [ ] Back up workflow configuration (export JSON)

### Quarterly Tasks

- [ ] Full workflow regression testing (all test cases)
- [ ] Update documentation for any changes
- [ ] Review security settings
- [ ] Evaluate new API models (GPT-4-turbo, etc.)
- [ ] Assess feature requests and improvements

### Key Metrics to Track

**Effectiveness:**
- Total comments generated per week/month
- Approval rate on first draft (target: 80%+)
- Average refinement iterations (target: <1.5)
- Maria's satisfaction rating

**Performance:**
- Average execution time (target: <60 seconds)
- API success rate (target: 98%+)
- Workflow uptime (target: 99%+)

**Cost:**
- Average cost per comment ($0.65-1.80)
- Total monthly API costs
- Cost optimization opportunities

---

## Security

### API Key Management

- [ ] All API keys stored in n8n credentials (never hardcode)
- [ ] Environment variables used for sensitive data
- [ ] API keys rotated regularly (monthly recommended)
- [ ] IP whitelisting implemented where possible

### Access Control

- [ ] Telegram bot restricted to authorized chat IDs
- [ ] n8n instance requires authentication
- [ ] Workflow access limited to authorized users
- [ ] Audit trail enabled for all changes

### Data Privacy

- [ ] No confidential client information in comments
- [ ] Research data is ephemeral (not persisted)
- [ ] Execution history cleared periodically
- [ ] GDPR/data protection compliance verified

### Webhook Security

- [ ] HTTPS only for all webhooks
- [ ] Telegram signature verification enabled
- [ ] n8n webhook authentication configured
- [ ] No sensitive data in webhook URLs

---

## Rollback Plan

### If Critical Issues Occur

#### Step 1: Deactivate Workflow

1. Click "Active" toggle to deactivate
2. Notify users via Telegram that system is down
3. Document the issue observed

#### Step 2: Identify Issue

1. Review execution logs for errors
2. Check API status pages:
   - OpenAI: https://status.openai.com/
   - Perplexity: https://status.perplexity.ai/
3. Test credentials independently
4. Review recent workflow changes

#### Step 3: Restore Previous Version

If needed, restore from backup:

1. Import backup JSON: `ceo-comment-writer-workflow-multi.json.backup`
2. Reconfigure credentials (they don't export)
3. Update profile path if needed
4. Test with sample request
5. Reactivate workflow

#### Step 4: Manual Fallback Process

If automation cannot be restored quickly:

1. Use direct ChatGPT interface
2. Copy prompt from `maria-ceo-comment-writer-prompt.md`
3. Manually research article/outlet
4. Generate comment manually
5. Document issue for later resolution

### Backup Schedule

- **Before any changes:** Export workflow JSON
- **Weekly:** Automated backup of workflow configuration
- **Monthly:** Full backup including profiles and documentation

---

## Cost Optimization

### Per-Comment Cost Breakdown

| Component | Cost | Optimization |
|-----------|------|--------------|
| Perplexity Research | $0.15-0.30 | Cache results for same articles |
| GPT-4o Draft | $0.25-0.50 | Reduce max_tokens if comments shorter |
| GPT-4o Humanize | $0.15-0.30 | Skip if quality acceptable |
| GPT-4o Refine | $0.25-0.50 | Improve first drafts to reduce iterations |

### Optimization Strategies

1. **Research Caching:** Already implemented in v2.3 for revisions
2. **Model Selection:** Consider GPT-4-turbo for faster/cheaper (when available)
3. **Token Reduction:** Optimize prompts to use fewer input tokens
4. **Quality Improvement:** Better prompts = fewer revision iterations
5. **Batch Processing:** Group similar requests when possible

### Monthly Cost Projections

| Volume | Standard | Optimized |
|--------|----------|-----------|
| 10/month | $18 | $10 |
| 50/month | $90 | $50 |
| 100/month | $180 | $100 |

---

## Support Resources

### Documentation

- **README.md:** Comprehensive system reference
- **PR-MANAGER-FEEDBACK-GUIDE.md:** User guide for Ilya
- **profiles/README.md:** Profile management guide
- **CLAUDE.md:** AI assistant guidance

### External Resources

- n8n Documentation: https://docs.n8n.io/
- n8n Community Forum: https://community.n8n.io/
- Telegram Bot API: https://core.telegram.org/bots/api
- Perplexity API: https://docs.perplexity.ai/
- OpenAI API: https://platform.openai.com/docs/

### Contact

- **Workflow Maintainer:** See repository maintainers
- **Maria (Final Approval):** Voice and content questions
- **Ilya (Primary User):** Workflow usage questions

---

**Document Version:** 2.3
**Last Updated:** 2024-11-22
**Status:** Production
