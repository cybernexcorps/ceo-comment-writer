# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains an **n8n workflow automation system** (v2.3) for AI-powered ghostwriting of media comments in the voices of DDVB team members, primarily Maria Arkhangelskaya (CEO and Managing Partner).

**Current Version:** 2.3 (AI Agent with Memory + Unlimited Feedback Loop)

**Key Context:**
- Maria Arkhangelskaya: 20+ years in branding, CEO of DDVB (since 2022), systems-thinking approach
- Purpose: Write authentic media comments for Russian industry publications (Sostav.ru, Forbes Russia, RBC, VC.ru, etc.)
- Language: Russian (русский язык) business communication
- Platform: n8n workflow automation + Telegram Bot interface
- AI Models: GPT-4o (generation), Perplexity Sonar (research)
- Maintained by: Ilya Morozov (requests comments) and Maria (reviews/approves)

## Repository Structure

### n8n Workflow (Primary)

**ceo-comment-writer-workflow-multi.json** (v2.3)
- Production workflow with 30+ nodes
- AI Agent architecture with conversational memory
- Multi-person profile support (PERSON field)
- Unlimited PR manager feedback iterations
- Import directly into n8n

### Profile System

**profiles/** directory:
- `maria_arkhangelskaya.json` - Maria's full voice profile
- `default.json` - Fallback profile
- `validate-profile.js` - Profile validation script
- `README.md` - Profile management guide

### Core Documentation

**README.md**
- Complete system overview and setup guide
- Version 2.3 features and architecture
- 9-part response framework
- Media outlet profiles
- Test cases and usage examples

**WORKFLOW-V2.3-AI-AGENT-GUIDE.md**
- Technical architecture documentation
- Node reference and data flow diagrams
- Memory management details
- Migration guide from v2.2

**PR-MANAGER-FEEDBACK-GUIDE.md**
- User guide for PR managers
- Feedback command reference
- Best practices for revision requests

### Setup Documentation

**QUICK-START.md** - 15-minute setup guide
**N8N-WORKFLOW-SETUP.md** - Comprehensive configuration guide
**IMPLEMENTATION-CHECKLIST.md** - Deployment checklist
**WORKFLOW-ARCHITECTURE.md** - Visual architecture diagrams
**WORKFLOW-SUMMARY.md** - High-level overview

### Voice & Profile Files

**PROMPTS.md**
- Complete prompt templates reference
- All AI Agent and Humanization prompts documented
- Variable reference and modification guide
- System and user message templates

**Мария Архангельская и DDVB_ профиль и роль.md**
- Maria's professional profile and background (Russian)
- Career progression and expertise areas

**MULTI-COMMENTATOR-GUIDE.md**
- Multi-person profile system documentation
- How to add new commentator profiles

## System Architecture (v2.3)

### n8n Workflow Components

**Phase 1: Request Intake**
- Telegram Bot trigger receives requests
- Parse PERSON, МЕДИА, ВОПРОС, КОНТЕКСТ, ЦЕЛЕВАЯ ДЛИНА
- Load JSON profile from profiles/ directory

**Phase 2: Research (Parallel)**
- Article content analysis (Perplexity API)
- Media outlet profiling
- Journalist background research

**Phase 3: Comment Generation**
- AI Agent with GPT-4o
- Conversational memory for revision context
- 9-part response framework (10-part for revisions)
- Humanization pass for natural Russian flow

**Phase 4: Approval Workflow**
- 4-button interface: Approve / Request Edits / Edit / Improve
- Unlimited feedback iterations
- Version tracking and diff calculation
- Memory cleanup on approval

### Key v2.3 Features

1. **AI Agent with Memory**: LangChain-style architecture with BufferMemory
2. **Unlimited Feedback Loop**: Natural language editing commands
3. **Multi-Person Profiles**: PERSON field for different commentators
4. **Research Caching**: Results cached across revision iterations
5. **Version Tracking**: Shows iteration count and changes summary

### Response Framework (9-Part Structure)

1. **КОНТЕКСТ**: Brief analysis of what's being discussed
2. **МЕДИА-АНАЛИЗ**: Media outlet identification and adaptation
3. **ПРЯМОЙ ОТВЕТ**: Direct answer alignment verification
4. **ОРИГИНАЛЬНОСТЬ**: Originality and facts check
5. **ПОЗИЦИОНИРОВАНИЕ**: Strategic angle for the commentator
6. **КОММЕНТАРИЙ**: Ready-to-post comment (1,500-2,000 characters)
7. **ПРОВЕРКА ДЛИНЫ**: Character count verification
8. **АЛЬТЕРНАТИВА**: Alternative approach (optional)
9. **ПРИМЕЧАНИЯ**: Caveats and recommendations
10. **ИЗМЕНЕНИЯ**: (Revisions only) Summary of changes made

### Input Requirements

- **PERSON**: Commentator profile (optional, defaults to Maria)
- **МЕДИА**: Media outlet (required) - determines tone and length
- **ВОПРОС**: Exact question from journalist (required)
- **КОНТЕКСТ**: Link or article summary (required)
- **ЦЕЛЕВАЯ ДЛИНА**: Target length, default 1,500-2,000 characters (required)

## Voice Guidelines

### Maria's Professional Identity
- 20+ years experience: Project Manager -> Director -> CEO
- Systems thinker: "Physics of Management" (ФИЗИКА УПРАВЛЕНИЯ) philosophy
- Operational excellence -> Strategic advantage mindset
- Council member: Russian Branding Companies Association (АБКР)
- Expert judge: "Silver Archer", "Silver Mercury" industry awards

### Core Voice Characteristics
- Professional expert with grounded authority (not arrogant)
- Systems perspective connecting operational to strategic
- Measured thoughtfulness (considers multiple angles)
- Formal вы-form Russian with warm, respectful directness
- Experience-based insights: "В нашей практике...", "За 20 лет..."

### Topics by Expertise Level

**Strong expertise**: Agency operations, client relationships, design systems, professional standards, Russian branding market dynamics

**Moderate expertise**: Brand positioning (operational angle), creative team management, industry trends

**Avoid**: Technical design details, specific tools/software, international markets, topics outside branding/agency management

### What Maria Avoids
- Marketing speak and corporate jargon
- Direct DDVB promotion or client name-dropping
- Personal attacks or unprofessional criticism
- Commenting outside expertise areas
- Absolutes and oversimplifications
- Trendy buzzwords without substance

## Media Outlet Profiles

The system adapts tone and length for 7 major Russian outlets:

| Outlet | Style | Character Range |
|--------|-------|-----------------|
| **Sostav.ru** | Industry insider | 1,500-2,000 |
| **Cossa.ru** | Digital marketing | 1,200-1,800 |
| **Forbes Russia** | CEO business | 1,800-2,200 |
| **RBC** | Authoritative journalism | 1,500-2,000 |
| **VC.ru** | Startup community | 1,200-1,800 |
| **Секрет фирмы** | Management systems | 1,500-2,200 |
| **Adindex.ru** | Advertising insider | 1,200-1,800 |

## Workflow

### Standard Flow
1. **Ilya sends** Telegram message with PERSON, МЕДИА, ВОПРОС, КОНТЕКСТ
2. **Workflow researches** article, outlet, and journalist
3. **AI Agent generates** 9-part response with draft comment
4. **Ilya reviews** and requests edits if needed (unlimited iterations)
5. **Maria approves** final version (or provides additional feedback)
6. **Post** comment on appropriate platform

### Feedback Loop (v2.3)
1. Click "Запросить правки" button
2. Send natural language feedback: "Сократить на 20%", "Добавить статистику"
3. AI regenerates with full context from memory
4. Repeat as needed until satisfied
5. Click "Утвердить" to finalize

## Ethical Boundaries

### Always Maintain
- Client confidentiality and NDAs
- Professional courtesy even when disagreeing
- DDVB's reputation and values alignment
- Industry ethical standards
- Respect for peers and competitors
- Factual accuracy and honesty

### Never Do
- Disclose confidential client information
- Make personal attacks or unprofessional comments
- Speak authoritatively outside expertise
- Contradict DDVB's public positions
- Violate professional ethics
- Make unsubstantiated claims

## Development Notes

### Working with the n8n Workflow

**To modify the workflow:**
1. Import `ceo-comment-writer-workflow-multi.json` into n8n
2. Make changes in n8n visual editor
3. Export and save back to this repository
4. Update documentation if architecture changes

**Key nodes to understand:**
- `Parse Request with PERSON` - Input parsing and profile selection
- `Load Profile` - Loads JSON from profiles/ directory
- `AI Agent` - GPT-4o with memory context
- `Save to Memory` / `Load Conversation History` - Memory management
- `Send For Approval` - 4-button Telegram interface

### Working with Profiles

**To add a new commentator:**
1. Copy `profiles/maria_arkhangelskaya.json` as template
2. Rename to `firstname_lastname.json`
3. Fill in all profile fields
4. Run `node profiles/validate-profile.js filename.json`
5. Add name mapping in Parse Request node

### File Encoding
All files use UTF-8 encoding due to Russian (Cyrillic) content. Ensure any edits preserve this encoding.

## Reference Information

- **Version**: 2.3 (AI Agent with Memory - November 2024)
- **Platform**: n8n workflow automation + Telegram Bot
- **AI Models**: GPT-4o (OpenAI), Sonar (Perplexity)
- **Language**: Russian (русский язык)
- **Telegram Channel**: ФИЗИКА УПРАВЛЕНИЯ (Physics of Management)

### Version History

| Version | Features |
|---------|----------|
| 2.0 | Media outlet awareness, 9-part framework |
| 2.1 | Basic AI Agent integration |
| 2.2 | Multi-person profile system (PERSON field) |
| **2.3** | **AI Agent + Memory + Unlimited Feedback Loop** |

### Repository File Summary

| File | Purpose |
|------|---------|
| `ceo-comment-writer-workflow-multi.json` | v2.3 production workflow |
| `profiles/*.json` | Commentator voice profiles |
| `README.md` | Main documentation |
| `WORKFLOW-V2.3-AI-AGENT-GUIDE.md` | Technical architecture |
| `PR-MANAGER-FEEDBACK-GUIDE.md` | User guide for feedback |
| `MULTI-COMMENTATOR-GUIDE.md` | Multi-person system guide |
| `PROMPTS.md` | Prompt templates reference |
| `Мария Архангельская и DDVB_ профиль и роль.md` | Maria's background |
| `QUICK-START.md` | 15-minute setup |
| `N8N-WORKFLOW-SETUP.md` | Comprehensive setup |
| `IMPLEMENTATION-CHECKLIST.md` | Deployment checklist |
| `WORKFLOW-ARCHITECTURE.md` | Visual diagrams |
| `WORKFLOW-SUMMARY.md` | High-level overview |
