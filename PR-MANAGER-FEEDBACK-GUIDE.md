# PR Manager Feedback Guide (v2.3)

User guide for requesting and refining media comments through the CEO Comment Writer Telegram bot.

**For:** Ilya Morozov (PR Manager) and other authorized users
**Version:** 2.3 (AI Agent with Memory + Unlimited Feedback Loop)

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Requesting a Comment](#requesting-a-comment)
3. [Approval Buttons](#approval-buttons)
4. [Requesting Changes](#requesting-changes)
5. [Feedback Command Reference](#feedback-command-reference)
6. [Best Practices](#best-practices)
7. [Workflow Examples](#workflow-examples)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

Version 2.3 supports **unlimited revision iterations**. You can refine comments as many times as needed until they're perfect.

### Key Features

- **Unlimited Revisions:** Keep refining until satisfied
- **Natural Language Feedback:** Describe changes in plain Russian
- **Revision History:** System remembers all previous versions
- **Smart Diff:** See what changed between versions
- **Auto-Improve:** One-click quality enhancement
- **Multi-Person Support:** Request comments for different team members

### Basic Flow

```
1. Send request to bot with PERSON, MEDIA, QUESTION, CONTEXT, TARGET LENGTH
2. Wait ~40-50 seconds for comment generation
3. Review generated comment with 9-part analysis
4. Click button: Approve, Request Edits, Edit, or Improve
5. If editing, send feedback and receive revised version
6. Repeat until satisfied, then Approve
```

---

## Requesting a Comment

### Input Format

Send a message to the Telegram bot with these fields:

```
PERSON: maria
MEDIA: Sostav.ru
QUESTION: Как изменился рынок брендинга в 2024 году?
CONTEXT: https://sostav.ru/article/branding-2024
TARGET LENGTH: 1500-2000
```

### Field Reference

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| **PERSON** | Optional | Who should comment (defaults to Maria) | `maria`, `Мария` |
| **MEDIA** | Required | Media outlet name | `Sostav.ru`, `Forbes Russia` |
| **QUESTION** | Required | Exact question from journalist | `Как оцениваете роль дизайн-систем?` |
| **CONTEXT** | Required | Article link or summary | `https://...` or text summary |
| **TARGET LENGTH** | Required | Target character count | `1500-2000`, `1200-1800` |

### Optional Fields

```
AUDIENCE: Профессионалы брендинга
URGENCY: Да
SPECIAL CONSIDERATIONS: Упомянут конкурент XYZ
```

### PERSON Field Options

| Input | Profile Used |
|-------|--------------|
| `maria`, `Мария`, `Maria Arkhangelskaya` | Maria Arkhangelskaya (CEO) |
| `default` or omitted | Maria Arkhangelskaya |
| Other names | As configured in profiles/ |

### Media Outlet Quick Reference

| Outlet | Tone | Length |
|--------|------|--------|
| **Sostav.ru** | Industry insider | 1,500-2,000 |
| **Cossa.ru** | Digital marketing | 1,200-1,800 |
| **Forbes Russia** | CEO business | 1,800-2,200 |
| **RBC** | Authoritative | 1,500-2,000 |
| **VC.ru** | Startup-friendly | 1,200-1,800 |
| **Sekret firmy** | Management systems | 1,500-2,200 |
| **Adindex.ru** | Advertising insider | 1,200-1,800 |

---

## Approval Buttons

After the comment is generated, you'll see **4 buttons**:

| Button | Russian | Action |
|--------|---------|--------|
| **Approve** | Утвердить | Approve and finalize - session ends |
| **Request Edits** | Запросить правки | Ask for specific changes |
| **Edit** | Редактировать | Same as Request Edits |
| **Improve** | Улучшить | Auto-improve without manual feedback |

### When to Use Each Button

**Approve** - Use when:
- Comment is ready to publish
- Quality meets expectations
- No changes needed

**Request Edits / Edit** - Use when:
- Specific changes needed (length, tone, content)
- Something needs to be added or removed
- Format needs adjustment

**Improve** - Use when:
- Comment is "almost good" but needs polishing
- Want to add more originality or examples
- Not sure what specific changes to request

---

## Requesting Changes

### Step 1: Click "Request Edits" or "Edit"

The bot will prompt you:

```
Describe the changes you want. Examples:

- "Shorten by 20% and add statistics"
- "More formal tone for Forbes"
- "Remove mention of competitors"
- "Add specific example from practice"

Send your feedback in the next message:
```

### Step 2: Send Your Feedback

Write what you want changed in natural language:

**Good feedback examples:**

```
Сократить на 20%, оставив главную мысль о дизайн-системах
```

```
Добавить конкретные цифры о росте рынка брендинга
```

```
Убрать слишком категоричные формулировки, сделать мягче
```

```
Больше про опыт DDVB, меньше общих слов о рынке
```

```
Сделать более формальным для Forbes, убрать разговорные обороты
```

```
Сократить на 20%, добавить статистику о рынке, более формальный тон для Forbes
```

**Bad feedback examples:**

```
Переделать
```
(Too vague - no actionable guidance)

```
Не нравится
```
(No specific direction)

```
Сделать лучше
```
(What specifically should be better?)

### Step 3: Review the Revision

The bot will generate a new version showing:

- **Version number:** "Version 2/..."
- **Length change:** "Shortened by 18%"
- **Changes summary:** What was modified

### Step 4: Repeat or Approve

- Need more changes? Click "Request Edits" again
- Satisfied? Click "Approve"

---

## Feedback Command Reference

### Length Adjustments

| Command | Effect |
|---------|--------|
| `Сократить на X%` | Reduce by percentage |
| `Увеличить до X знаков` | Expand to character count |
| `Сделать короче/длиннее` | General length change |
| `Уложиться в X знаков` | Target specific length |
| `Сохранить длину` | Keep current length while making other changes |

### Tone Adjustments

| Command | Effect |
|---------|--------|
| `Более формальный тон` | More formal language |
| `Более живой/разговорный` | More conversational |
| `Убрать канцелярит` | Remove bureaucratic language |
| `Добавить экспертности` | More authoritative tone |
| `Смягчить формулировки` | Soften statements |
| `Сделать более уверенным` | More confident tone |

### Content Adjustments

| Command | Effect |
|---------|--------|
| `Добавить статистику` | Include data/numbers |
| `Добавить пример из практики` | Include DDVB case example |
| `Убрать упоминание X` | Remove specific topic/mention |
| `Сделать акцент на Y` | Emphasize specific aspect |
| `Больше конкретики` | More specific details |
| `Меньше общих слов` | Reduce generic statements |
| `Усилить связь операционного и стратегического` | Strengthen systems-thinking angle |

### Structure Adjustments

| Command | Effect |
|---------|--------|
| `Начать с главной мысли` | Lead with key point |
| `Добавить вывод/итог` | Add conclusion |
| `Разбить на абзацы` | Better paragraph structure |
| `Переформулировать начало` | Rewrite opening |
| `Переформулировать конец` | Rewrite closing |

### Combination Commands

You can combine multiple instructions:

```
Сократить на 20%, добавить статистику о рынке, более формальный тон для Forbes
```

```
Убрать упоминание конкурентов, добавить пример из практики DDVB, сохранить длину
```

```
Начать с главной мысли, добавить вывод, сделать более уверенным
```

---

## Best Practices

### 1. Be Specific in Feedback

**Instead of:** "Improve it"
**Say:** "Add specific statistics about digital branding growth in 2024"

**Instead of:** "Make it better"
**Say:** "More confident tone, lead with the main insight"

### 2. Reference the Original Question

Make sure revisions still directly answer the journalist's question. If you drift too far, remind:

```
Убедиться, что комментарий прямо отвечает на вопрос журналиста о дизайн-системах
```

### 3. Consider the Media Outlet

Different outlets have different expectations:

- **Forbes Russia:** More formal, business-focused, strategic insights
- **VC.ru:** Startup-friendly, can be more direct, practical advice
- **Sostav.ru:** Industry insider language, professional terminology
- **RBC:** Authoritative, data-driven, broader business context

### 4. Limit Major Rewrites

If fundamental issues exist (wrong angle, wrong topic, wrong tone), consider starting fresh rather than making 10+ revisions.

### 5. Use Auto-Improve First

For general quality boost, try "Improve" button before specific feedback. It will:
- Add specific examples
- Improve originality
- Strengthen expert positioning
- Maintain original length

### 6. Verify Character Count

Always check the character count matches the target for the media outlet. If not:

```
Целевая длина должна остаться 1500-2000 знаков
```

### 7. Check Voice Consistency

Ensure the comment sounds like Maria (or the specified person):
- Systems-thinking perspective
- Experience-based insights
- Professional but warm tone
- No marketing jargon

---

## Workflow Examples

### Example 1: Routine Comment (Quick Approval)

```
You: PERSON: maria
     MEDIA: Sostav.ru
     QUESTION: Как агентствам поддерживать высокие стандарты качества?
     CONTEXT: https://sostav.ru/article/quality-standards
     TARGET LENGTH: 1500-2000

Bot: [Generates comment - 1,780 chars]
     [9-part analysis]
     [4 buttons]

You: [Click "Approve"]

Bot: "Comment approved!"
```

**Time:** ~45 seconds

### Example 2: Comment with One Revision

```
You: [Initial request]

Bot: [Comment v1 - 1,950 chars]

You: [Click "Request Edits"]

Bot: "What changes do you want?"

You: "Сократить до 1600 знаков, добавить пример из практики"

Bot: [Comment v2 - 1,580 chars, -19%]
     Changes: Shortened, added DDVB practice example

You: [Click "Approve"]
```

**Time:** ~80 seconds

### Example 3: Forbes Comment with Multiple Revisions

```
You: PERSON: maria
     MEDIA: Forbes Russia
     QUESTION: Какие инновации вы внедрили в управление агентством?
     CONTEXT: Interview about CEO management approaches
     TARGET LENGTH: 1800-2200

Bot: [Comment v1 - 2,100 chars]

You: [Click "Request Edits"]
Bot: "What changes?"
You: "Более стратегический фокус, меньше операционных деталей"

Bot: [Comment v2 - 2,050 chars]

You: [Click "Request Edits"]
Bot: "What changes?"
You: "Добавить конкретную метрику или результат"

Bot: [Comment v3 - 2,120 chars]
     Changes: Added specific efficiency metrics

You: [Click "Approve"]
```

**Time:** ~3 minutes

### Example 4: Using Auto-Improve

```
You: [Initial request for VC.ru]

Bot: [Comment v1 - okay but generic]

You: [Click "Improve"]

Bot: "Enhancing comment..."
     [Comment v2 - more original, specific examples added]

You: [Click "Approve"]
```

**Time:** ~70 seconds

### Example 5: Urgent Request

```
You: PERSON: maria
     MEDIA: RBC
     QUESTION: Ваш комментарий о [breaking news]?
     CONTEXT: [Brief summary - no link]
     TARGET LENGTH: 1500-2000

Bot: [Comment v1]

You: [Review quickly, minor issue]
     [Click "Request Edits"]
     "Убрать последнее предложение, слишком рискованное"

Bot: [Comment v2]

You: [Click "Approve"]
```

**Time:** ~75 seconds

---

## Troubleshooting

### "Session not found" Error

**Cause:** The revision session has expired or n8n was restarted.

**Solution:** Start a new request from the beginning.

### Feedback Not Being Applied

**Check if your feedback is:**
- Specific enough to act on
- Not contradicting previous constraints
- Within Maria's expertise area

**Solutions:**
1. Be more specific: Instead of "better", say "more formal tone"
2. Check for conflicting instructions
3. Try breaking into smaller feedback steps

### Comment Too Long/Short After Revision

**Solution:** Be explicit about length:

```
Целевая длина должна остаться 1500-2000 знаков после изменений
```

Or:

```
Сократить до ровно 1500 знаков
```

### Changes Not Showing in Output

The system shows changes in "CHANGES" section. If not visible:
- The AI may not have detected significant changes
- Try more specific feedback

### Wrong Person's Voice

**Check:**
- PERSON field in your request
- Spelling of person name
- Person profile exists in system

**Solution:** Confirm PERSON field and retry:

```
PERSON: maria
```

### Button Click Has No Effect

**Possible causes:**
- Network delay
- Session timeout
- Webhook issue

**Solutions:**
1. Wait a moment and try again
2. If still no response, start new request
3. Contact system administrator if persistent

### Russian Text Looks Broken

**Cause:** Encoding issue

**Solution:** Report to system administrator - UTF-8 encoding needs to be verified in n8n configuration.

---

## Version Tracking

Each revision shows its version number:

```
Comment ready! Version 3/unlimited

Length: 1,580 chars (shortened by 18%)
```

The system maintains full history of all versions and feedback, allowing intelligent revisions that understand context from previous iterations.

---

## When to Escalate to Maria

Always get Maria's direct review for:

- Controversial or sensitive industry topics
- Competitive situations naming other agencies
- Requests for specific client examples
- Business strategy or financial topics
- First-time comment types or platforms
- Anything that feels risky or "off"
- High-visibility publications (Forbes, RBC)

---

## Quick Reference Card

### Input Format
```
PERSON: [maria]
MEDIA: [Outlet name]
QUESTION: [Exact question]
CONTEXT: [Link or summary]
TARGET LENGTH: [1500-2000]
```

### Buttons
- **Approve** = Done
- **Request Edits** = Give feedback
- **Edit** = Give feedback
- **Improve** = Auto-enhance

### Common Feedback
- `Сократить на X%`
- `Более формальный тон`
- `Добавить статистику`
- `Убрать упоминание X`
- `Добавить пример из практики`

### Character Targets
- Sostav: 1,500-2,000
- Forbes: 1,800-2,200
- VC.ru: 1,200-1,800

---

## Questions?

- **Technical issues:** Check IMPLEMENTATION-GUIDE.md or contact system administrator
- **Voice/quality issues:** Review with Maria
- **New features:** Check README.md for latest capabilities

---

**Document Version:** 2.3
**Last Updated:** 2024-11-22
**For:** Ilya Morozov and authorized PR managers
