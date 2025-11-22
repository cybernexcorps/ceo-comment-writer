# Profile Management Guide

This directory contains JSON profiles for the CEO Comment Writer multi-commentator system. Each profile defines the voice, expertise, and communication style for a specific person.

## Directory Structure

```
profiles/
├── maria_arkhangelskaya.json    Maria's profile (CEO of DDVB)
├── default.json                 Fallback profile (copy of Maria)
├── validate-profile.js          Validation script
└── README.md                    This file
```

## Profile Structure

Each profile JSON file contains:

### Core Identity
- `profile_id` - Unique identifier (matches filename)
- `name` - Full name in English
- `name_ru` - Full name in Russian (for Russian profiles)
- `title` - Job title in English
- `title_ru` - Job title in Russian
- `company` - Company name

### Expertise & Voice
- `expertise` - Array of expertise areas (English)
- `expertise_ru` - Array of expertise areas (Russian)
- `communication_style` - How they communicate (paragraph)
- `communication_style_ru` - Communication style in Russian
- `tone` - Overall tone description
- `tone_ru` - Tone in Russian

### Character & Approach
- `personality_traits` - Array of personality characteristics
- `personality_traits_ru` - Personality traits in Russian
- `talking_points` - Key topics they discuss
- `talking_points_ru` - Talking points in Russian
- `values` - Professional values and ethics
- `values_ru` - Values in Russian

### Patterns & Constraints
- `speaking_patterns` - How they structure comments
- `speaking_patterns_ru` - Speaking patterns in Russian
- `do_not_say` - Topics/phrases to avoid
- `do_not_say_ru` - Constraints in Russian
- `preferred_structure` - Comment structure template
- `preferred_structure_ru` - Structure in Russian

### Metadata
- `experience_years` - Years of professional experience
- `career_highlights` - Career milestones
- `career_highlights_ru` - Career in Russian
- `philosophy` - Professional philosophy/approach
- `philosophy_ru` - Philosophy in Russian
- `default_target_length` - Default comment length (e.g., "1500-2000")
- `language` - Primary language ("ru" or "en")
- `active` - Is this profile active? (true/false)
- `version` - Profile version
- `last_updated` - Last update date (YYYY-MM-DD)

## Adding a New Profile

### Step 1: Create the JSON File

1. Copy `maria_arkhangelskaya.json` as a template
2. Rename to `firstname_lastname.json` (lowercase, underscores)
   - Example: `ilya_morozov.json`, `anna_ivanova.json`

### Step 2: Fill in Profile Information

1. Update `profile_id` to match filename (without .json)
2. Fill in all required fields (see structure above)
3. For Russian profiles, include both English and Russian (`_ru`) versions
4. Be thorough with expertise, talking_points, and do_not_say arrays
5. Update `last_updated` to today's date

### Step 3: Validate the Profile

Run the validation script:

```bash
cd profiles/
node validate-profile.js firstname_lastname.json
```

Fix any errors or warnings reported.

### Step 4: Update Workflow Mapping

Edit the workflow's Parse Request node to add name mapping:

```javascript
const personMap = {
  // ... existing mappings ...
  'anna': 'anna_ivanova',
  'анна': 'anna_ivanova',
  'anna ivanova': 'anna_ivanova',
  'анна иванова': 'anna_ivanova'
};
```

Add both English and Russian name variations.

### Step 5: Test the Profile

Send a test Telegram message:

```
PERSON: anna
МЕДИА: Sostav.ru
ВОПРОС: [test question]
КОНТЕКСТ: [test context]
```

Review the generated comment for voice consistency.

## Validation Script

### Usage

Validate a specific profile:
```bash
node validate-profile.js maria_arkhangelskaya.json
```

Validate all profiles in directory:
```bash
node validate-profile.js
```

### What It Checks

- ✅ All required fields present
- ✅ Correct data types (arrays, strings, booleans)
- ✅ Valid language code ('ru' or 'en')
- ✅ profile_id matches filename
- ✅ Russian fields present for Russian profiles
- ⚠️ Warnings for empty arrays or overly long fields

## Profile Template

Use this as a quick reference when creating profiles:

```json
{
  "profile_id": "firstname_lastname",
  "name": "First Last",
  "name_ru": "Имя Фамилия",
  "title": "Job Title",
  "title_ru": "Должность",
  "company": "Company Name",
  "expertise": [
    "Area 1",
    "Area 2",
    "Area 3"
  ],
  "expertise_ru": [
    "Область 1",
    "Область 2",
    "Область 3"
  ],
  "communication_style": "Description of how they communicate...",
  "communication_style_ru": "Описание стиля коммуникации...",
  "tone": "Overall tone description...",
  "tone_ru": "Описание тона...",
  "personality_traits": [
    "Trait 1",
    "Trait 2"
  ],
  "personality_traits_ru": [
    "Черта 1",
    "Черта 2"
  ],
  "talking_points": [
    "Topic 1",
    "Topic 2"
  ],
  "talking_points_ru": [
    "Тема 1",
    "Тема 2"
  ],
  "values": [
    "Value 1",
    "Value 2"
  ],
  "values_ru": [
    "Ценность 1",
    "Ценность 2"
  ],
  "speaking_patterns": "How they structure their comments...",
  "speaking_patterns_ru": "Как они структурируют комментарии...",
  "do_not_say": [
    "Avoid this topic",
    "Don't use this phrase"
  ],
  "do_not_say_ru": [
    "Избегать эту тему",
    "Не использовать эту фразу"
  ],
  "preferred_structure": "Opening → Support → Insight → Conclusion",
  "preferred_structure_ru": "Открытие → Поддержка → Инсайт → Заключение",
  "experience_years": 15,
  "career_highlights": [
    "Highlight 1",
    "Highlight 2"
  ],
  "career_highlights_ru": [
    "Достижение 1",
    "Достижение 2"
  ],
  "philosophy": "Professional philosophy...",
  "philosophy_ru": "Профессиональная философия...",
  "default_target_length": "1500-2000",
  "language": "ru",
  "active": true,
  "version": "1.0",
  "last_updated": "2024-11-21"
}
```

## Best Practices

### Profile Development
1. **Interview the person** - Get authentic voice samples
2. **Review past comments** - Analyze their writing style
3. **Start simple** - Begin with 3-5 expertise areas, expand later
4. **Be specific** - "Avoid marketing jargon" is better than "Be professional"
5. **Test frequently** - Generate test comments, review with the person

### Maintenance
1. **Version control** - Commit profiles to Git
2. **Update regularly** - As expertise evolves, update profiles
3. **Backup before changes** - Keep profile history
4. **Document changes** - Note what was updated and why

### Quality Assurance
1. **Validate after every change** - Run validation script
2. **Test generation** - Generate sample comments after updates
3. **Review with person** - Get feedback on voice accuracy
4. **Iterate** - Refine based on real-world comment performance

## Troubleshooting

### Profile Not Loading

**Symptom:** Workflow falls back to default profile

**Check:**
1. Filename matches `profile_id` exactly (with underscores, lowercase)
2. JSON syntax is valid (run validation script)
3. File is saved in `profiles/` directory
4. Person mapping is added to Parse Request node

### Voice Doesn't Sound Right

**Symptom:** Comments don't match person's style

**Fix:**
1. Review `communication_style` - be more specific
2. Expand `talking_points` with more topics
3. Add more items to `do_not_say` array
4. Refine `speaking_patterns` with concrete examples
5. Test with multiple comment requests

### Validation Fails

**Symptom:** `validate-profile.js` reports errors

**Fix:**
1. Check error message for specific field
2. Ensure all required fields are present
3. Verify arrays are arrays, strings are strings
4. Check for trailing commas in JSON
5. Use a JSON linter (jsonlint.com or VSCode)

## Profile Deactivation

To temporarily disable a profile without deleting it:

1. Set `"active": false` in the profile JSON
2. Add a comment explaining why:
   ```json
   {
     "profile_id": "person_name",
     "active": false,
     "_deactivation_reason": "Person left company - 2024-11-21",
     ...
   }
   ```
3. Workflow will fall back to default profile

## Support

For questions or issues with profiles:
- Check this README first
- Run validation script for errors
- Review `maria_arkhangelskaya.json` as reference
- See `MULTI-COMMENTATOR-GUIDE.md` for workflow integration

---

**Last Updated:** 2024-11-21
**Version:** 1.0
**Maintained By:** CEO Comment Writer System
