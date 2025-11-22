# CEO Comment Writer v2.3

AI-powered n8n workflow system for ghostwriting media comments in the voices of DDVB team members, primarily Maria Arkhangelskaya (CEO and Managing Partner).

**Version:** 2.3 (AI Agent with Memory + Unlimited Feedback Loop)
**Platform:** n8n workflow automation + Telegram Bot
**AI Models:** GPT-4o (generation), Perplexity Sonar (research)
**Language:** Russian (business communication)
**Status:** Production-ready

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Version 2.3 Features](#version-23-features)
3. [Architecture](#architecture)
4. [Multi-Commentator System](#multi-commentator-system)
5. [Voice Guidelines](#voice-guidelines)
6. [Media Outlet Profiles](#media-outlet-profiles)
7. [Response Framework](#response-framework)
8. [Technical Reference](#technical-reference)
9. [API Integration](#api-integration)
10. [Repository Structure](#repository-structure)
11. [Quick Reference](#quick-reference)
12. [Version History](#version-history)

---

## System Overview

### What This Is

An n8n workflow that automates the creation of media comments in Maria Arkhangelskaya's authentic voice (and other DDVB team members) for Russian industry publications. The system uses:

- **Telegram** for user interaction and approval workflow
- **Perplexity API** for parallel research on articles, media outlets, and journalists
- **OpenAI GPT-4o** for intelligent comment generation with conversational memory

### Who It's For

- **Maria Arkhangelskaya** - CEO of DDVB, primary commentator (reviews and approves comments)
- **Ilya Morozov** - PR Manager (requests comments, manages approval workflow)
- **Other DDVB team members** - Can be added as commentators via the profile system

### Key Capabilities

- Authentic voice replication with 20+ years of professional experience captured
- Media outlet awareness adapting tone and length for 7 major Russian publications
- Comprehensive research phase analyzing articles, outlets, and journalists
- 9-part response framework ensuring quality and originality
- Unlimited feedback iterations with conversational memory
- Interactive Telegram approval workflow with 4 action buttons

### Workflow Summary

```
1. REQUEST
   Ilya sends Telegram message with PERSON, MEDIA, QUESTION, CONTEXT, TARGET LENGTH

2. RESEARCH (10-15 seconds)
   System researches in parallel: Article content, Media outlet profile, Journalist background

3. GENERATION (25-35 seconds)
   AI Agent drafts comment using 9-part framework in commentator's voice

4. HUMANIZATION (10-15 seconds)
   Second pass ensures natural Russian business communication flow

5. APPROVAL (~40-50 seconds total)
   Ilya receives comment with 4 buttons: Approve, Request Edits, Edit, Improve

6. FEEDBACK LOOP (unlimited iterations)
   Natural language editing commands until satisfied

7. FINALIZED
   Comment ready for publication
```

---

## Version 2.3 Features

### AI Agent with Memory

- **Conversational Memory:** System remembers all previous iterations within a session
- **Revision History:** Full context carried through unlimited revisions
- **Smart Diff:** Shows what changed between versions (length percentage, content summary)
- **Research Caching:** Research results cached across revisions for efficiency

### Unlimited Feedback Loop

- **"Request Edits" Button:** Request specific changes in natural language
- **Natural Language Commands:** "Shorten by 20%", "Add statistics", "More formal tone"
- **Version Tracking:** "Version 3/..." displays iteration count
- **Auto-Improve:** One-click quality enhancement without manual feedback

### Multi-Person Profile System

- **PERSON Field:** Specify commentator in request (defaults to Maria)
- **JSON Profiles:** Each person has a comprehensive voice profile
- **Dynamic Loading:** Profiles loaded at runtime based on request
- **Easy Extension:** Add new commentators by creating profile JSON files

### Enhanced Workflow

- 30+ nodes with complete feedback loop routing
- Session memory via workflow static data
- 4-button approval interface (Approve, Request Edits, Edit, Improve)
- Automatic memory cleanup on session completion
- Graceful error handling with fallback profiles

---

## Architecture

### High-Level Architecture

```
+-------------------------------------------------------------------+
|                   CEO COMMENT WRITER v2.3                          |
|                AI Agent with Memory Architecture                   |
+-------------------------------------------------------------------+

         +--------------------------------------+
         |      1. REQUEST INTAKE PHASE         |
         |   (Telegram Bot Interface)           |
         +--------------------------------------+
                        |
                        v
         +--------------------------------------+
         |     2. VALIDATION & PARSING          |
         |  (Required Fields + PERSON Check)    |
         +--------------------------------------+
                        |
                        v
         +--------------------------------------+
         |      3. PROFILE LOADING              |
         |  (JSON from profiles/ directory)     |
         +--------------------------------------+
                        |
                        v
         +--------------------------------------+
         |      4. RESEARCH PHASE               |
         |  (Perplexity API - 3 Parallel)       |
         +--------------------------------------+
                        |
                        v
         +--------------------------------------+
         |    5. COMMENT GENERATION             |
         |  (AI Agent + GPT-4o + Memory)        |
         +--------------------------------------+
                        |
                        v
         +--------------------------------------+
         |     6. HUMANIZATION                  |
         |  (Natural Russian Flow)              |
         +--------------------------------------+
                        |
                        v
         +--------------------------------------+
         |     7. APPROVAL WORKFLOW             |
         |  (Interactive Telegram Buttons)      |
         +--------------------------------------+
                        |
              +---------+---------+---------+
              |         |         |         |
              v         v         v         v
          APPROVE  REQUEST     EDIT    IMPROVE
                   EDITS
              |         |         |         |
              v         +----+----+----+----+
           [END]             |
                             v
              +--------------------------------------+
              |     8. FEEDBACK LOOP                 |
              |  (Memory + Regeneration)             |
              +--------------------------------------+
                             |
                             v
                    [BACK TO STEP 5]
```

### Detailed Data Flow

#### Phase 1: Request Intake and Validation

```
[Telegram Message]
       |
       v
+------------------+
| Telegram Trigger | <-- Webhook receives message
+------------------+
       |
       v
+------------------+
| Parse Request    | <-- Extract: PERSON, MEDIA, QUESTION, CONTEXT, TARGET LENGTH
| with PERSON      |     Normalize person name to profile_id
+------------------+
       |
       v
+------------------+
| Check Required   | <-- Validate all required fields present
| Fields           |
+------------------+
       |
   +---+---+
   |       |
 TRUE    FALSE
   |       |
   v       v
[Error]  [Continue]
```

#### Phase 2: Profile Loading and Research

```
+------------------+
| Load Profile     | <-- Load from profiles/{person}.json
| (Code Node)      |     Fallback to default.json if not found
+------------------+
       |
       v
+------------------+
| Initialize       | <-- Create session memory structure
| Memory           |     Store person, media, question, context
+------------------+
       |
       v
+------------------+
| Send             | <-- "Request accepted! Profile: Maria..."
| Confirmation     |
+------------------+
       |
       v
+---------+---------+---------+
|         |         |         |
v         v         v         |
+-------+ +-------+ +-------+ |
|Article| |Media  | |Journal| | PARALLEL EXECUTION
|Research|Outlet ||ist     | |
+-------+ +-------+ +-------+ |
|         |         |         |
+---------+---------+---------+
          |
          v
+------------------+
| Merge Research   | <-- Combine all 3 research results
| Results          |
+------------------+
          |
          v
+------------------+
| Compile Research | <-- Format comprehensive report
| Report           |     for AI Agent prompt
+------------------+
```

#### Phase 3: AI Agent Comment Generation

```
+------------------+
| Load Conversation| <-- Check for previous iterations
| History          |     Inject revision context if exists
+------------------+
       |
       v
+------------------+
| Build AI Prompt  | <-- Profile voice guidelines
| with Memory      |     + Research report
| Context          |     + Revision history (if any)
+------------------+
       |
       v
+------------------+
| AI Agent         | <-- GPT-4o generates 9-part response
| (GPT-4o Draft)   |     Temperature: 0.7, Max tokens: 3000
+------------------+
       |
       v
+------------------+
| Extract Comment  | <-- Parse KOMMENTARIY section
|                  |     Count characters
+------------------+
       |
       v
+------------------+
| Humanize Comment | <-- Remove AI patterns
| (GPT-4o)         |     Natural Russian flow
|                  |     Temperature: 0.8
+------------------+
       |
       v
+------------------+
| Calculate Diff   | <-- Compare with previous version
| (if revision)    |     Length change, content summary
+------------------+
       |
       v
+------------------+
| Save to Memory   | <-- Store iteration to session
+------------------+
```

#### Phase 4: Approval Workflow

```
+------------------+
| Send For         | <-- Comment + Full analysis
| Approval         |     + 4-button inline keyboard
+------------------+
       |
       |  Inline Keyboard:
       |  +---------------------------+
       |  | Approve  | Request Edits  |
       |  | Edit     | Improve        |
       |  +---------------------------+
       |
       v
+------------------+
| Telegram Callback| <-- User clicks button
| Query Trigger    |
+------------------+
       |
       v
+------------------+
| Parse Callback   | <-- Extract action and session ID
| Action           |
+------------------+
       |
       v
+------------------+
| Route Action     | <-- Branch by action type
| (Switch)         |
+------------------+
       |
   +---+---+---+---+
   |   |   |   |
   v   v   v   v
```

#### Phase 5: Action Branches

**Branch 1: APPROVE**
```
+------------------+
| Handle Approval  | <-- Mark session complete
+------------------+
       |
       v
+------------------+
| Clear Memory     | <-- Remove session data
+------------------+
       |
       v
+------------------+
| Send Confirmation| <-- "Comment approved!"
+------------------+
       |
       v
     [END]
```

**Branch 2: REQUEST EDITS / EDIT**
```
+------------------+
| Prompt for       | <-- "Describe desired changes..."
| Feedback Input   |     Examples provided
+------------------+
       |
       v
+------------------+
| Mark Session     | <-- status = "awaiting_feedback"
| Awaiting Feedback|
+------------------+
       |
       v
[User sends feedback message]
       |
       v
+------------------+
| Capture Feedback | <-- Match to session
| from Message     |     Extract feedback text
+------------------+
       |
       v
+------------------+
| Acknowledge      | <-- "Feedback received, regenerating..."
| Feedback         |
+------------------+
       |
       v
+------------------+
| Update Memory    | <-- Store feedback
| for Regeneration |     Prepare for next iteration
+------------------+
       |
       v
[BACK TO PHASE 3: Load Conversation History]
```

**Branch 3: IMPROVE**
```
+------------------+
| Handle Improve   | <-- Generate auto-improvement prompt
| (Auto Feedback)  |     "Add examples, improve originality..."
+------------------+
       |
       v
+------------------+
| Send Improving   | <-- "Enhancing comment..."
| Message          |
+------------------+
       |
       v
[BACK TO PHASE 3: Load Conversation History]
```

### Memory System

The workflow uses n8n's workflow static data to maintain session memory:

```javascript
// Memory Structure
{
  session_id: "userId_timestamp",
  created_at: "2024-11-21T10:30:00Z",
  iterations: [
    {
      iteration: 1,
      comment: "First draft...",
      feedback: null,
      timestamp: "2024-11-21T10:30:00Z",
      characterCount: 1650
    },
    {
      iteration: 2,
      comment: "Revised draft...",
      feedback: "Make it 20% shorter",
      timestamp: "2024-11-21T10:35:00Z",
      characterCount: 1320
    }
  ],
  current_iteration: 2,
  status: "active", // active | awaiting_feedback | completed
  person: "maria_arkhangelskaya",
  media: "Sostav.ru",
  question: "...",
  context: "...",
  profile: { ... },
  researchResults: "..."
}
```

### Node Summary

**Total Nodes:** 30+

| Category | Count | Nodes |
|----------|-------|-------|
| Triggers | 3 | Telegram Message, Callback Query, Edit Message |
| Code | 12 | Parse Request, Load Profile, Initialize Memory, Extract Comment, etc. |
| Conditionals | 5 | Check Required Fields, Route Action, Check Feedback, etc. |
| HTTP Requests | 6 | 3x Perplexity Research, 3x OpenAI GPT-4o |
| Merge | 1 | Merge Research Results |
| Telegram Actions | 11 | Confirmations, Approvals, Prompts, etc. |

---

## Multi-Commentator System

### Overview

The system supports multiple commentators beyond Maria Arkhangelskaya. Each person has a JSON profile defining their voice, expertise, and communication style.

### How It Works

1. **PERSON Field in Request:** User specifies who should comment
2. **Profile Loading:** System loads corresponding JSON profile
3. **Voice Injection:** Profile data injected into AI prompt
4. **Fallback Handling:** If profile not found, uses default (Maria)

### Input Format with PERSON

```
PERSON: maria
MEDIA: Sostav.ru
QUESTION: How has the Russian branding market changed in 2024?
CONTEXT: https://sostav.ru/article/branding-trends-2024
TARGET LENGTH: 1500-2000
```

**Accepted PERSON variations:**
- English: `maria`, `maria arkhangelskaya`
- Russian: `Mария`, `Мария Архангельская`
- Shorthand: `ПЕРСОНА: Мария`

### Profile Structure

Each profile is stored in `profiles/{profile_id}.json`:

```json
{
  "profile_id": "maria_arkhangelskaya",
  "name": "Maria Arkhangelskaya",
  "name_ru": "Мария Архангельская",
  "title": "CEO & Managing Partner",
  "title_ru": "Генеральный директор и управляющий партнёр",
  "company": "DDVB",
  "expertise": [
    "Agency operations and management systems",
    "Client relationship building",
    "Design systems and visual identity",
    "Professional standards in branding",
    "Russian branding market dynamics"
  ],
  "expertise_ru": [...],
  "communication_style": "Professional expert with systems-thinking...",
  "communication_style_ru": "...",
  "tone": "Authoritative without arrogance...",
  "tone_ru": "...",
  "personality_traits": [...],
  "talking_points": [...],
  "values": [...],
  "speaking_patterns": "...",
  "do_not_say": [...],
  "preferred_structure": "...",
  "experience_years": 20,
  "career_highlights": [...],
  "philosophy": "Physics of Management...",
  "default_target_length": "1500-2000",
  "language": "ru",
  "active": true,
  "version": "1.0",
  "last_updated": "2024-11-21"
}
```

### Adding a New Commentator

**Step 1: Create Profile (5 min)**
```bash
cd profiles/
cp maria_arkhangelskaya.json new_person.json
# Edit new_person.json with their information
```

**Step 2: Validate (2 min)**
```bash
node validate-profile.js new_person.json
```

**Step 3: Add Name Mapping (3 min)**

Edit Parse Request node in workflow:
```javascript
const personMap = {
  // ... existing ...
  'newperson': 'new_person',
  'новый': 'new_person'
};
```

**Step 4: Test (5 min)**
```
PERSON: newperson
MEDIA: VC.ru
QUESTION: Test question
CONTEXT: Test context
```

### Profile Directory Structure

```
profiles/
├── maria_arkhangelskaya.json    Primary profile
├── default.json                 Fallback (copy of Maria)
├── validate-profile.js          Validation script
└── README.md                    Profile management guide
```

---

## Voice Guidelines

### Maria Arkhangelskaya - Primary Commentator

#### Professional Identity

- **Experience:** 20+ years in branding (Project Manager -> Director -> CEO)
- **Role:** CEO and Managing Partner of DDVB (since 2022)
- **Philosophy:** "Physics of Management" (ФИЗИКА УПРАВЛЕНИЯ) - systems-thinking approach
- **Positions:** Council member of Russian Branding Companies Association (АБКР); Expert judge for "Silver Archer", "Silver Mercury" industry awards

#### Core Voice Characteristics

| Aspect | Description |
|--------|-------------|
| **Authority** | Professional expert with grounded authority (not arrogant) |
| **Perspective** | Systems thinking connecting operational to strategic |
| **Thoughtfulness** | Measured, considers multiple angles before concluding |
| **Language** | Formal вы-form Russian with warm, respectful directness |
| **Foundation** | Experience-based insights: "В нашей практике...", "За 20 лет..." |

#### Expertise Levels

**Strong Expertise (Comment Confidently):**
- Agency operations and management systems
- Client relationship building and service excellence
- Design systems and visual identity development
- Professional standards in branding
- Russian branding market dynamics

**Moderate Expertise (Comment with Care):**
- Brand positioning (from operational angle)
- Creative team management
- Industry trends and market changes

**Avoid Commenting On:**
- Technical design details beyond strategic level
- Specific tools/software (unless operationally relevant)
- International markets outside Russia
- Topics outside branding/agency management

#### What Maria Does

- Experience-based insights: "В нашей практике..."
- Systems-thinking perspective on topics
- Balanced, nuanced views acknowledging complexity
- Actionable takeaways for readers
- Professional but warm tone
- Connection between operational and strategic
- Professional standards advocacy
- Concrete examples (without confidentials)

#### What Maria Avoids

- Marketing speak and corporate jargon
- Direct DDVB promotion or client name-dropping
- Confidential client details
- Personal attacks or unprofessional criticism
- Topics outside her expertise
- Absolutes and oversimplifications
- Trendy buzzwords without substance

### Example Comment Styles

**Design Systems Topic:**
```
"Дизайн-системы действительно стали критически важны для брендов,
особенно в digital-среде. В нашей практике мы видим, что компании,
которые инвестируют в системный подход на старте, экономят
колоссальные ресурсы в дальнейшем. Но важно понимать: дизайн-
система — это не просто библиотека компонентов, а живой инструмент,
который должен эволюционировать вместе с бизнесом."
```

**Professional Standards:**
```
"Исследовательский этап — это фундамент любого брендингового проекта.
Когда агентства пропускают эту фазу, они по сути строят дом на песке.
Понимаю давление со стороны бюджетов и сроков. Но наша задача как
профессионалов — объяснять клиентам ценность глубокого погружения
в контекст."
```

**Measured Disagreement:**
```
"Согласна, что рынок меняется. Но списывать со счетов классические
агентства пока рано. За 20 лет в индустрии я видела много прогнозов
о 'смерти' того или иного формата — большинство не сбылись. Вопрос
не в формате, а в ценности, которую мы создаём для клиентов."
```

### Ethical Boundaries

**Always Maintain:**
- Client confidentiality and NDAs
- Professional courtesy even when disagreeing
- DDVB's reputation and values alignment
- Industry ethical standards
- Respect for peers and competitors
- Factual accuracy and honesty

**Never Do:**
- Disclose confidential client information
- Make personal attacks or unprofessional comments
- Speak authoritatively outside expertise
- Contradict DDVB's public positions
- Violate professional ethics
- Make unsubstantiated claims

---

## Media Outlet Profiles

The system adapts comments for 7 major Russian publications:

| Outlet | Audience | Tone | Length | Key Characteristics |
|--------|----------|------|--------|---------------------|
| **Sostav.ru** | Branding professionals | Industry insider | 1,500-2,000 | Professional terminology, insider perspective, industry context |
| **Cossa.ru** | Digital marketers | Digital marketing focus | 1,200-1,800 | Digital-first, practical applications, marketing metrics |
| **Forbes Russia** | Business executives | CEO business perspective | 1,800-2,200 | Strategic vision, business impact, leadership angle |
| **RBC** | Broad business audience | Authoritative journalism | 1,500-2,000 | Factual, data-driven, broader business context |
| **VC.ru** | Startup community | Startup-friendly | 1,200-1,800 | Practical advice, entrepreneurial angle, accessible |
| **Секрет фирмы** | Management professionals | Management systems | 1,500-2,200 | Operational focus, management frameworks, systems thinking |
| **Adindex.ru** | Advertising professionals | Advertising insider | 1,200-1,800 | Industry-specific, campaign focus, ad market dynamics |

### Adaptation Guidelines

**Forbes Russia:**
- More formal, business-focused language
- Strategic insights over operational details
- Leadership perspective
- Longer, more comprehensive responses

**VC.ru:**
- More direct, startup-friendly tone
- Practical, actionable advice
- Less formal but still professional
- Shorter, punchier responses

**Sostav.ru:**
- Industry insider language
- Professional terminology
- Peer-to-peer communication style
- Standard length with depth

---

## Response Framework

### 9-Part Structure (Standard)

Every generated comment includes:

| # | Section | Russian | Description |
|---|---------|---------|-------------|
| 1 | **CONTEXT** | КОНТЕКСТ | Brief analysis of what's being discussed (2-3 sentences) |
| 2 | **MEDIA ANALYSIS** | МЕДИА-АНАЛИЗ | Media outlet identification and tone adaptation (2-3 sentences) |
| 3 | **DIRECT ANSWER** | ПРЯМОЙ ОТВЕТ | Verification that comment directly answers the question (1-2 sentences) |
| 4 | **ORIGINALITY** | ОРИГИНАЛЬНОСТЬ | Originality check - no "general truths" (2-3 sentences) |
| 5 | **POSITIONING** | ПОЗИЦИОНИРОВАНИЕ | Strategic angle for the commentator (2-3 sentences) |
| 6 | **COMMENT** | КОММЕНТАРИЙ | Ready-to-post comment (1,500-2,000 characters) |
| 7 | **LENGTH CHECK** | ПРОВЕРКА ДЛИНЫ | Character count verification |
| 8 | **ALTERNATIVE** | АЛЬТЕРНАТИВА | Alternative approach (optional) |
| 9 | **NOTES** | ПРИМЕЧАНИЯ | Caveats and recommendations (bullets) |

### 10-Part Structure (Revisions)

For feedback iterations, adds:

| 10 | **CHANGES** | ИЗМЕНЕНИЯ | Summary of what changed from previous version |

### Output Example

```
1. КОНТЕКСТ:
Статья на Sostav.ru обсуждает растущую важность дизайн-систем в
современном брендинге. Автор рассматривает тенденции 2024 года.

2. МЕДИА-АНАЛИЗ:
Sostav.ru — отраслевое издание для профессионалов брендинга.
Требуется экспертный тон с использованием профессиональной
терминологии. Оптимальная длина: 1,500-2,000 знаков.

3. ПРЯМОЙ ОТВЕТ:
Вопрос о роли дизайн-систем требует оценки их значимости и
практических рекомендаций от эксперта-практика.

4. ОРИГИНАЛЬНОСТЬ:
Комментарий избегает общих мест и предлагает конкретный взгляд
из практики DDVB на системный подход к дизайну.

5. ПОЗИЦИОНИРОВАНИЕ:
Позиция: системное мышление + операционный опыт. Показать связь
между инвестициями в дизайн-систему и долгосрочной эффективностью.

6. КОММЕНТАРИЙ:
"Дизайн-системы действительно стали критически важны для брендов..."
[1,847 знаков]

7. ПРОВЕРКА ДЛИНЫ:
1,847 знаков — в пределах целевого диапазона 1,500-2,000.

8. АЛЬТЕРНАТИВА:
Можно сделать акцент на типичных ошибках при внедрении дизайн-систем.

9. ПРИМЕЧАНИЯ:
- Комментарий подходит для профессиональной аудитории Sostav
- Можно добавить конкретную статистику при наличии
- Избегаем упоминания конкретных клиентов
```

---

## Technical Reference

### Performance Characteristics

#### Execution Time per Iteration

| Phase | Time |
|-------|------|
| Memory Operations | ~1s |
| Research (cached for revisions) | 0s (or ~11-16s first time) |
| AI Draft Generation | ~15-25s |
| Humanization | ~8-12s |
| Telegram Messages | ~2s |
| **Total (first iteration)** | **~40-55s** |
| **Total (revision)** | **~25-40s** |

#### Memory Usage

- ~5KB per iteration stored
- Research results cached once (~2KB)
- Profile cached (~1KB)
- 10 iterations = ~55KB per session

### Cost Estimates

#### Per Comment

| Service | Usage | Cost |
|---------|-------|------|
| Perplexity (Research) | 3 requests x ~1,000 tokens | ~$0.15-0.30 |
| OpenAI GPT-4o (Draft) | ~2,000 input + 1,500 output tokens | ~$0.25-0.50 |
| OpenAI GPT-4o (Humanize) | ~1,500 input + 1,000 output tokens | ~$0.15-0.30 |
| OpenAI GPT-4o (Refine) | ~2,000 input + 1,500 output tokens | ~$0.25-0.50 |
| **Total per comment** | | **~$0.65-1.80** |

#### Monthly Projections

| Volume | Cost Range |
|--------|------------|
| 10 comments/month | $7-18 |
| 50 comments/month | $33-90 |
| 100 comments/month | $65-180 |

### Error Handling

| Scenario | Action | User Notification |
|----------|--------|-------------------|
| Profile not found | Load default.json | Warning in confirmation |
| Invalid JSON syntax | Load hardcoded minimal profile | Error message |
| Missing required fields | Load fallback profile | Error with field name |
| Perplexity API fails | Continue with partial research | Note in research report |
| OpenAI rate limits | Automatic retry | Delay notification |
| Session not found | Return error | "Start new request" |

### Session Management

**Session Creation:** On new request
**Session Cleanup:** On approval or manual intervention
**TTL:** Currently unlimited (future: 24-hour auto-cleanup)
**Iteration Limits:** Currently unlimited (future: soft limit at 10)

### Known Limitations

1. **Memory is ephemeral:** Workflow static data clears on n8n restart
2. **Single user per session:** Multiple users sharing bot may conflict
3. **No persistence:** Comment history not saved to database
4. **Research not re-run:** Revisions use cached research (may be stale)

---

## API Integration

### Telegram Bot API

**Authentication:** Bot Token from @BotFather
**Webhook Endpoints:**
- Main trigger: `/telegram-webhook-ceo-comment`
- Approval callbacks: `/telegram-approval-webhook`
- Edit messages: `/telegram-edit-webhook`

**Message Types:**
- Text messages (requests and responses)
- Callback queries (button clicks)
- Reply messages (edits and improvements)

**Inline Keyboard (4 Buttons):**
```json
{
  "inline_keyboard": [
    [
      {"text": "Approve", "callback_data": "approve_{sessionId}"},
      {"text": "Request Edits", "callback_data": "request_edits_{sessionId}"}
    ],
    [
      {"text": "Edit", "callback_data": "edit_{sessionId}"},
      {"text": "Improve", "callback_data": "improve_{sessionId}"}
    ]
  ]
}
```

### Perplexity API

**Endpoint:** `https://api.perplexity.ai/chat/completions`
**Authentication:** Bearer token (HTTP Header Auth)
**Model:** `sonar`

**Used For:**
- Research Article (article content analysis)
- Research Media Outlet (outlet profiling)
- Research Journalist (journalist background)

**Request Format:**
```json
{
  "model": "sonar",
  "messages": [
    {"role": "system", "content": "You are a research assistant..."},
    {"role": "user", "content": "Analyze this article..."}
  ]
}
```

### OpenAI API

**Endpoint:** `https://api.openai.com/v1/chat/completions`
**Authentication:** Bearer token (Authorization header)
**Model:** `gpt-4o`

**Used For:**
- GPT-4o Draft Comment (initial draft with 9-part framework)
- Humanize Comment (natural Russian flow)
- GPT-4o Refine Comment (feedback-based refinement)

**Settings:**
| Node | Temperature | Max Tokens |
|------|-------------|------------|
| Draft Comment | 0.7 | 3000 |
| Humanize | 0.8 | 2000 |
| Refine | 0.7 | 2500 |

---

## Repository Structure

```
ceo-comment-writer/
|
+-- CORE WORKFLOW
|   +-- ceo-comment-writer-workflow-multi.json   # v2.3 production workflow (30+ nodes)
|
+-- PROFILES
|   +-- profiles/
|       +-- maria_arkhangelskaya.json            # Maria's full voice profile
|       +-- default.json                         # Fallback profile
|       +-- validate-profile.js                  # Profile validation script
|       +-- README.md                            # Profile management guide
|
+-- DOCUMENTATION
|   +-- README.md                                # This file (comprehensive reference)
|   +-- PR-MANAGER-FEEDBACK-GUIDE.md             # User guide for Ilya
|   +-- IMPLEMENTATION-GUIDE.md                  # Setup and deployment guide
|   +-- CLAUDE.md                                # AI assistant guidance
|
+-- PROMPTS & PROFILES
|   +-- maria-ceo-comment-writer-prompt.md       # Full prompt library (~23 KB)
|   +-- maria-ceo-comment-writer-instructions-short.md  # Short instructions
|   +-- maria-ceo-comment-writer-prompt-improved.md     # Enhanced prompt
|   +-- conversation-starters.md                 # Telegram conversation starters
|   +-- Mарія Архангельська і DDVB_ профіль і роль.md   # Maria's background (Russian)
|
+-- BACKUP
    +-- ceo-comment-writer-workflow-multi.json.backup  # v2.2 backup
```

### Key Files

| File | Purpose | When to Use |
|------|---------|-------------|
| `ceo-comment-writer-workflow-multi.json` | Production workflow | Import into n8n |
| `README.md` | Comprehensive reference | Architecture, features, configuration |
| `PR-MANAGER-FEEDBACK-GUIDE.md` | User guide | How to request and refine comments |
| `IMPLEMENTATION-GUIDE.md` | Setup guide | Initial deployment and testing |
| `profiles/*.json` | Voice profiles | Add/modify commentators |

---

## Quick Reference

### Input Format

**Required Fields:**
```
PERSON: [Profile name, default: maria]
MEDIA: [Sostav.ru / Cossa.ru / Forbes Russia / RBC / VC.ru / etc.]
QUESTION: [Exact question from journalist]
CONTEXT: [Link or summary of article/discussion]
TARGET LENGTH: [Default: 1,500-2,000 characters]
```

**Optional Fields:**
```
AUDIENCE: [Industry peers / Clients / General public]
URGENCY: [Y/N]
SPECIAL CONSIDERATIONS: [Sensitivities, competitive factors]
```

### Approval Buttons

| Button | Russian | Action |
|--------|---------|--------|
| Approve | Утвердить | Finalize comment, end session |
| Request Edits | Запросить правки | Prompt for specific feedback |
| Edit | Редактировать | Same as Request Edits |
| Improve | Улучшить | Auto-improve without feedback |

### Feedback Commands

**Length:**
- "Shorten by 20%" / "Сократить на 20%"
- "Expand to 2000 characters" / "Увеличить до 2000 знаков"
- "Fit within 1200 characters" / "Уложиться в 1200 знаков"

**Tone:**
- "More formal tone" / "Более формальный тон"
- "More conversational" / "Более живой/разговорный"
- "Remove bureaucratic language" / "Убрать канцелярит"

**Content:**
- "Add statistics" / "Добавить статистику"
- "Add practical example" / "Добавить пример из практики"
- "Remove mention of X" / "Убрать упоминание X"
- "Emphasize Y" / "Сделать акцент на Y"

**Structure:**
- "Lead with key point" / "Начать с главной мысли"
- "Add conclusion" / "Добавить вывод/итог"
- "Better paragraphs" / "Разбить на абзацы"

### Character Count Reference

| Outlet | Target Range |
|--------|--------------|
| Sostav.ru | 1,500-2,000 |
| Cossa.ru | 1,200-1,800 |
| Forbes Russia | 1,800-2,200 |
| RBC | 1,500-2,000 |
| VC.ru | 1,200-1,800 |
| Sekret firmy | 1,500-2,200 |
| Adindex.ru | 1,200-1,800 |

---

## Version History

| Version | Date | Key Features |
|---------|------|--------------|
| 1.0 | 2024 | Initial single-person system (Maria only) |
| 2.0 | Nov 2024 | 9-part framework, media outlet awareness, research integration |
| 2.1 | Nov 2024 | Basic AI Agent integration |
| 2.2 | Nov 2024 | Multi-person profile system (PERSON field) |
| **2.3** | **Nov 2024** | **AI Agent + Memory + Unlimited Feedback Loop** |

### v2.3 Changelog

**New Features:**
- LangChain-style AI Agent architecture
- BufferMemory for conversational memory
- Unlimited PR manager feedback iterations
- Natural language editing commands
- Version tracking and diff calculation
- Research caching across revisions
- 4-button approval interface (Approve/Request Edits/Edit/Improve)
- Automatic memory cleanup on completion

**Technical Improvements:**
- 30+ nodes with complete feedback loop routing
- Session memory via workflow static data
- Graceful error handling with fallback profiles
- Enhanced prompt injection with revision history

### Future Roadmap

**Short-term (1-3 months):**
- PostgreSQL persistence for sessions
- 24-hour session TTL with auto-cleanup
- Comment history analytics

**Medium-term (3-6 months):**
- Multi-language support (English)
- A/B testing for voice variations
- Webhook for direct publishing

**Long-term (6+ months):**
- Machine learning for voice refinement
- Predictive comment suggestions
- Full media management platform integration

---

## Support

### Documentation

- **This file:** Comprehensive system reference
- **PR-MANAGER-FEEDBACK-GUIDE.md:** User guide for requesting and refining comments
- **IMPLEMENTATION-GUIDE.md:** Setup, deployment, and troubleshooting
- **profiles/README.md:** Managing commentator profiles

### External Resources

- n8n Documentation: https://docs.n8n.io/
- n8n Community: https://community.n8n.io/
- Telegram Bot API: https://core.telegram.org/bots/api
- Perplexity API: https://docs.perplexity.ai/
- OpenAI API: https://platform.openai.com/docs/

### Contact

- **Workflow Maintainer:** See repository maintainers
- **Maria (Final Approval):** For voice and content questions
- **Ilya (Primary User):** For workflow usage questions

---

**Document Version:** 2.3
**Last Updated:** 2024-11-22
**Status:** Production
